import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const interactionTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);

  // Duplicate screenshots for infinite scroll
  const duplicatedScreenshots = [...screenshots, ...screenshots];

  // Calculate slide width including gap
  const calculateSlideWidth = useCallback(() => {
    if (!carouselRef.current) return;
    
    const firstSlide = carouselRef.current.querySelector('.carousel-slide') as HTMLElement;
    if (!firstSlide) return;
    
    const slideRect = firstSlide.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(firstSlide);
    const marginRight = parseFloat(computedStyle.marginRight) || 0;
    
    setSlideWidth(slideRect.width + marginRight);
  }, []);

  // Navigation functions
  const handlePrev = useCallback(() => {
    setCurrentSlideIndex(prev => {
      const newIndex = prev === 0 ? screenshots.length - 1 : prev - 1;
      return newIndex;
    });
    
    // Clear timers and pause autoplay temporarily
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    
    setIsAutoplayPaused(true);
    
    // Resume autoplay after 3 seconds of inactivity
    interactionTimerRef.current = setTimeout(() => {
      setIsAutoplayPaused(false);
    }, 3000);
  }, [screenshots.length]);

  const handleNext = useCallback(() => {
    setCurrentSlideIndex(prev => {
      const newIndex = prev === screenshots.length - 1 ? 0 : prev + 1;
      return newIndex;
    });
    
    // Clear timers and pause autoplay temporarily
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    
    setIsAutoplayPaused(true);
    
    // Resume autoplay after 3 seconds of inactivity
    interactionTimerRef.current = setTimeout(() => {
      setIsAutoplayPaused(false);
    }, 3000);
  }, [screenshots.length]);

  // Initialize slide width calculation
  useEffect(() => {
    const timer = setTimeout(calculateSlideWidth, 100);
    
    const handleResize = () => {
      calculateSlideWidth();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateSlideWidth]);

  // Autoplay functionality
  useEffect(() => {
    if (isAutoplayPaused || slideWidth === 0) return;
    
    autoplayTimerRef.current = setInterval(() => {
      setCurrentSlideIndex(prev => {
        const newIndex = prev === screenshots.length - 1 ? 0 : prev + 1;
        return newIndex;
      });
    }, 3000); // 3 second intervals
    
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isAutoplayPaused, slideWidth, screenshots.length]);

  // Intersection observer for pause/resume
  useEffect(() => {
    const carousel = containerRef.current;
    if (!carousel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsAutoplayPaused(true);
        } else {
          // Only resume if not manually paused
          if (interactionTimerRef.current) return;
          setIsAutoplayPaused(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(carousel);

    return () => observer.disconnect();
  }, []);

  // Mouse hover pause/resume (desktop only)
  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) {
      setIsAutoplayPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      if (interactionTimerRef.current) return;
      setIsAutoplayPaused(false);
    }
  };

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    };
  }, []);

  const translateX = slideWidth > 0 ? -(currentSlideIndex * slideWidth) : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Mobile Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        onClick={handleNext}
        className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Next image"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      <div
        ref={carouselRef}
        className="flex gap-4 md:gap-6 transition-transform duration-500 ease-out"
        style={{ 
          transform: `translateX(${translateX}px)`,
        }}
      >
        {duplicatedScreenshots.map((screenshot, index) => {
          return (
            <div 
              key={index} 
              className="carousel-slide flex-shrink-0 w-[calc(100%/1)] md:w-[calc(100%/3)] lg:w-[calc(100%/5)]"
            >
              <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg bg-gray-50 flex items-center justify-center">
                {screenshot.href ? (
                  <a 
                    href={screenshot.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute inset-0"
                  >
                    <img
                      src={screenshot.src}
                      alt={screenshot.alt}
                      className="w-full h-full object-contain"
                    />
                  </a>
                ) : (
                  <img
                    src={screenshot.src}
                    alt={screenshot.alt}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfiniteCarousel;