"use client";
import { useEffect, useRef, useState } from "react";

export function useCarousel(total: number, interval = 3000) {
  const [currentIndex, setCurrentIndex] = useState(0); //현재 슬라이드 인덱스 (0부터 시작)
  const [isPlaying, setIsPlaying] = useState(true); //자동 슬라이드 재생 여부 상태 (true : 재생 중, false : 일시정지)
  const timerRef = useRef<NodeJS.Timeout | null>(null); // 자동 슬라이드 타이머 참조

  // 다음 슬라이드로 이동
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total); // 현재 인덱스를 1 증가시키되, 마지막이면 다시 0으로 순환
  };

  // 이전 슬라이드로 이동
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total); // 현재 인덱스를 1 감소시키되, 0에서 이전으로 가면 마지막 인덱스로 순환
  };

  // 자동 슬라이드 시작 함수
  const startAutoSlide = () => {
    if (!timerRef.current) {
      // 지정된 interval(기본 3초)마다 handleNext 호출
      timerRef.current = setInterval(handleNext, interval);
      setIsPlaying(true); // 재생 상태로 변경
    }
  };

  // 자동 슬라이드 일시정지 함수
  const pauseAutoSlide = () => {
    // 타이머가 존재하면 중단
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null; // 참조 초기화
      setIsPlaying(false); // 상태를 일시정지로 변경
    }
  };


  useEffect(() => {
    startAutoSlide(); // 처음 렌더 시 자동 실행 시작
    return () => {
      // 컴포넌트가 사라질 때 실행 (cleanup)
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return {
    currentIndex,
    handleNext,
    handlePrev,
    pauseAutoSlide,
    startAutoSlide,
    isPlaying,
  };
}
