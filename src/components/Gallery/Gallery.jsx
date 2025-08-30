import { useState } from "react";
import "./gallery.css";

/**
 * gallery + lightbox
 * @param {{ images?: {src: string, alt?: string}[], title?: string, subtitle?: string, dark?: boolean }} props
 */
export default function Gallery({
  images = [],
  title = "Instalaciones",
  subtitle = "Tatami",
  dark = false,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const totalImages = images.length;

  const showImage = (index) => {
    if (index < 0) index = totalImages - 1;
    if (index >= totalImages) index = 0;
    setCurrentIndex(index);
  };

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <section className={`section grid ${dark ? "dark" : "light"}`}>
      <div className="intro-center">
        <p className="subtitle">{subtitle}</p>
        <h2>{title}</h2>
      </div>

      <div className="gallery grid">
        {images.map((img, index) => (
          <div
            key={index}
            className="gallery-item image"
            onClick={() => openLightbox(index)}
          >
            <img src={img.src} alt={img.alt || ""} className="cover" />
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <div
          className="lightbox active"
          onClick={(e) => e.target === e.currentTarget && closeLightbox()}
        >
          <div className="lightbox__close" onClick={closeLightbox}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="lightbox__content">
            <img src={images[currentIndex].src} alt={images[currentIndex].alt || ""} />
          </div>
          <div className="lightbox__nav">
            <button className="lightbox__nav-prev" onClick={() => showImage(currentIndex - 1)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button className="lightbox__nav-next" onClick={() => showImage(currentIndex + 1)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}