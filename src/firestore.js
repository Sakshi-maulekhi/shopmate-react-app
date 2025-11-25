import { app } from './firebase';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const db = getFirestore(app);

export async function getCartFromFirestore(uid) {
  if (!uid) return null;
  try {
    const ref = doc(db, 'carts', uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    const data = snap.data();
    console.debug('getCartFromFirestore', uid, data);
    return Array.isArray(data.items) ? data.items : null;
  } catch (err) {
    console.error('getCartFromFirestore error', err);
    // If the error indicates the client is offline, surface that so callers can handle it.
    if (err && (err.code === 'unavailable' || /client is offline/i.test(err.message || ''))) {
      const offlineError = new Error('client-offline');
      offlineError.code = 'client-offline';
      throw offlineError;
    }
    return null;
  }
}

export async function setCartToFirestore(uid, cart) {
  if (!uid) return;
  try {
    const ref = doc(db, 'carts', uid);
    console.debug('setCartToFirestore', uid, cart);
    await setDoc(ref, { items: cart });
  } catch (err) {
    console.error('setCartToFirestore error', err);
    if (err && (err.code === 'unavailable' || /client is offline/i.test(err.message || ''))) {
      const offlineError = new Error('client-offline');
      offlineError.code = 'client-offline';
      throw offlineError;
    }
  }
}

export function mergeCarts(cartA = [], cartB = []) {
  // cartA and cartB are arrays of items with at least { id, quantity }
  const map = new Map();
  for (const item of cartA) {
    const existing = map.get(item.id);
    if (existing) {
      map.set(item.id, { ...existing, quantity: existing.quantity + (item.quantity || 0) });
    } else {
      map.set(item.id, { ...item });
    }
  }
  for (const item of cartB) {
    const existing = map.get(item.id);
    if (existing) {
      map.set(item.id, { ...existing, quantity: existing.quantity + (item.quantity || 0) });
    } else {
      map.set(item.id, { ...item });
    }
  }
  return Array.from(map.values());
}

export async function mergeGuestWithFirestoreCart(uid, guestCart = []) {
  if (!uid) return guestCart;
  try {
    const remote = await getCartFromFirestore(uid);
    if (!remote) {
      // No remote cart, attempt to set guest as remote
      console.debug('No remote cart, setting guest as remote', uid, guestCart);
      try {
        await setCartToFirestore(uid, guestCart);
        return guestCart;
      } catch (e) {
        // If offline, store pending merge and return guestCart immediately
        if (e && e.code === 'client-offline') {
          storePendingMerge(uid, guestCart);
          return guestCart;
        }
        throw e;
      }
    }
    const merged = mergeCarts(remote, guestCart);
    console.debug('Merging remote and guest', { uid, remote, guestCart, merged });
    try {
      await setCartToFirestore(uid, merged);
      return merged;
    } catch (e) {
      if (e && e.code === 'client-offline') {
        // Save merged cart as pending to be flushed later
        storePendingMerge(uid, merged);
        return merged;
      }
      throw e;
    }
  } catch (err) {
    console.error('mergeGuestWithFirestoreCart error', err);
    // If offline error bubbled up, save pending merge and return guestCart
    if (err && err.code === 'client-offline') {
      storePendingMerge(uid, guestCart);
      return guestCart;
    }
    return guestCart;
  }
}

// Pending merge helpers: save merged carts locally and retry when online
const PENDING_KEY = 'pendingCartMerges';

function loadPending() {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function savePending(obj) {
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(obj));
  } catch (e) {
    console.error('savePending error', e);
  }
}

export function storePendingMerge(uid, items) {
  if (!uid) return;
  const pending = loadPending();
  pending[uid] = items;
  savePending(pending);
  console.debug('Stored pending merge for', uid);
}

export async function flushPendingMerges() {
  const pending = loadPending();
  const uids = Object.keys(pending);
  if (uids.length === 0) return;
  for (const uid of uids) {
    try {
      const items = pending[uid];
      await setCartToFirestore(uid, items);
      const p = loadPending();
      delete p[uid];
      savePending(p);
      console.debug('Flushed pending merge for', uid);
    } catch (e) {
      console.warn('Failed to flush pending merge for', uid, e);
      // Leave it pending and try later
    }
  }
}
