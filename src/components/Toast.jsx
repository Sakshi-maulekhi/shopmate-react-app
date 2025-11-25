import React, { useEffect } from 'react';

function Toast({ message, duration = 3000, onClose, style = {} }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => {
      onClose && onClose();
    }, duration);
    return () => clearTimeout(t);
  }, [message, duration, onClose]);

  if (!message) return null;

  const baseStyle = {
    position: 'fixed',
    top: '16px',
    right: '16px',
    background: '#181616ff',
    color: '#f124a3ff',
    padding: '10px 14px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(66, 54, 54, 0.97)',
    zIndex: 2000,
    fontSize: '0.95rem'
  };

  const merged = { ...baseStyle, ...style };

  return (
    <div style={merged}>
      {message}
    </div>
  );
}

export default Toast;
