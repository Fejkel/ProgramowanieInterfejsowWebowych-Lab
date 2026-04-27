"use client";
import { useState } from 'react';

export default function GameGallery({ images = [], title }) {
  const [currentImg, setCurrentImg] = useState(images[0]);
  const formatSrc = (src) => src ? `/${src}` : '/img/placeholder.png';
    return (
    <div className="galeria-wrapper">
      <div className="foto-glowne">
        <img src={formatSrc(currentImg)} alt={title} />
      </div>

      {images.length > 1 && (
        <div className="miniaturki-grid">
          {images.map((img, index) => (
            <img 
              key={index}
              src={formatSrc(img)}
              alt={`${title} - miniatura ${index}`}
              className={currentImg === img ? "mini-aktywna" : "mini"}
              onClick={() => setCurrentImg(img)}
            />
          ))}
        </div>
      )}
    </div>
  );
}