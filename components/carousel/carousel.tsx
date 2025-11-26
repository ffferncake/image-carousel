// components/carousel/carousel.tsx
"use client";

import { useCarousel } from "@/hooks/use-carousel";
import { CarouselItem } from "./carousel-item";
import { CarouselIndicator } from "./carousel-indicator";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// 이미지 경로 리스트 지정
const images = [
  "/images/misha_1.jpg",
  "/images/misha_2.jpg",
  "/images/misha_3.jpg",
  "/images/misha_4.jpg",
  "/images/misha_5.jpg",
  "/images/misha_6.jpg",
  "/images/misha_7.jpg",
];

export function Carousel() {
  const {
    currentIndex, //현재 표시 중인 이미지의 인덱스
    handleNext, // 다음 이미지로 이동하는 함수
    handlePrev, // 이전 이미지로 이동하는 함수
    pauseAutoSlide, // 자동 슬라이드를 일시정지하는 함수
    startAutoSlide, // 자동 슬라이드를 시작하는 함수
    isPlaying, // 현재 자동 슬라이드 중인지 여부 (boolean)
  } = useCarousel(images.length, 3000); // 3초 간격으로 자동 슬라이드 설정

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl group"
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, i) => (
          <CarouselItem key={i} src={src} alt={`Slide ${i + 1}`} />
        ))}
      </div>

      <Button
        variant="ghost"
        className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
        onClick={handlePrev}
      >
        <ChevronLeft className="w-6 h-6 text-white drop-shadow" />
      </Button>

      <Button
        variant="ghost"
        className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
        onClick={handleNext}
      >
        <ChevronRight className="w-6 h-6 text-white drop-shadow" />
      </Button>

      <CarouselIndicator
        total={images.length}
        current={currentIndex}
        isPlaying={isPlaying}
        onTogglePlay={() => (isPlaying ? pauseAutoSlide() : startAutoSlide())}
      />
    </div>
  );
}
