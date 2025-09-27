
import React, { useEffect, useRef, useState } from 'react';

interface Screenshot {
  src: string;
  alt: string;
  href?: string;
}

interface InfiniteCarouselProps {
  screenshots: Screenshot[];
}

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({ screenshots }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPaused(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(carousel);

    return () => observer.disconnect();
  }, []);

  const duplicatedScreenshots = [...screenshots, ...screenshots];

  return (
    <div
      ref={carouselRef}
      className="relative w-full overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`flex gap-4 md:gap-6 animate-scroll ${isPaused ? 'animation-paused' : ''}`}
        style={{ animationDuration: '30s' }}
      >
        {duplicatedScreenshots.map((screenshot, index) => (
          <div key={index} className="flex-shrink-0 w-[calc(100%/1)] md:w-[calc(100%/3)] lg:w-[calc(100%/5)]">
            {screenshot.href ? (
              <a href={screenshot.href} target="_blank" rel="noopener noreferrer">
                <img
                  src={screenshot.src}
                  alt={screenshot.alt}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </a>
            ) : (
              <img
                src={screenshot.src}
                alt={screenshot.alt}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;
