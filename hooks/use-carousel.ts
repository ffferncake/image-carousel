"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Custom carousel hook with flexible step size.
 * @param total Total number of images
 * @param interval Auto-slide interval (ms)
 * @param step Number of images to move per slide (default: 1)
 */
export function useCarousel(total: number, interval = 3000, step = 1) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ Move forward by "step" images
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + step) % total);
  };

  // ✅ Move backward by "step" images
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - step + total) % total);
  };

  const startAutoSlide = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(handleNext, interval);
      setIsPlaying(true);
    }
  };

  const pauseAutoSlide = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsPlaying(false);
    }
  };

  // Cleanup
  useEffect(() => {
    startAutoSlide();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [step]); // step 바뀔 때 타이머 재시작

  return {
    currentIndex,
    handleNext,
    handlePrev,
    pauseAutoSlide,
    startAutoSlide,
    isPlaying,
  };
}
