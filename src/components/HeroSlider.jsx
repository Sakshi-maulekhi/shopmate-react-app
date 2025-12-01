
import { useState, useEffect } from "react";
import "../HeroSlider.css";
import men2 from "../assets/men2.jpg";
import laptop from "../assets/laptop.jpg";

const images = [
  "https://i.postimg.cc/pXHbTWPP/banner1.avif",
  men2,
  
  laptop
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  // Auto-slide every 3s
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(timer);
  });

  const nextSlide = () => {
    setIndex(prev => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex(prev => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="hero-slider">
      <div
        className="slider-wrapper"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <img key={i} src={img} alt={`slide-${i}`} className="slide-img" />
        ))}
      </div>

      {/* Left / Right arrows */}
      <button className="arrow left" onClick={prevSlide}>❮</button>
      <button className="arrow right" onClick={nextSlide}>❯</button>

      {/* Dots */}
      <div className="dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}
