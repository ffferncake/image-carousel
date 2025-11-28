"use client";

import { useState, useEffect } from "react";
import { useCarousel } from "@/hooks/use-carousel";
import { CarouselItem } from "./carousel-item";
import { CarouselIndicator } from "./carousel-indicator";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/images/misha_1.jpg",
  "/images/misha_2.jpg",
  "/images/misha_3.jpg",
  "/images/misha_4.jpg",
  "/images/misha_5.jpg",
  "/images/misha_6.jpg",
  "/images/misha_7.jpg",
  "/images/misha_7.jpg",
  "/images/misha_7.jpg",
];

export function Carousel() {
  const [viewMode, setViewMode] = useState<1 | 3>(1);

  // 👇 pass viewMode as step
  const {
    currentIndex,
    handleNext,
    handlePrev,
    pauseAutoSlide,
    startAutoSlide,
    isPlaying,
  } = useCarousel(images.length, 3000, viewMode);

  // 총 그룹 수 (indicator용)
  const totalGroups = Math.ceil(images.length / viewMode);

  // ✅ 슬라이드 이동 비율 계산 (각 그룹 단위로)
  const currentGroup = Math.floor(currentIndex / viewMode);
  const translateX = currentGroup * (100 / totalGroups);

  // 보기모드 변경 시 인덱스 리셋 (왜곡 방지)
  useEffect(() => {
    pauseAutoSlide();
    startAutoSlide();
  }, [viewMode]);

  return (
    <>
      {/* 보기 모드 버튼 */}

      <div className="relative w-full overflow-hidden rounded-xl group bg-[#0B1221]">
        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <Button
          className="px-3 py-1"
            variant={viewMode === 1 ? "default" : "ghost"}
            onClick={() => setViewMode(1)}
          >
            1개 보기
          </Button>
          <Button
            className="px-3 py-1"
            variant={viewMode === 3 ? "default" : "ghost"}
            onClick={() => setViewMode(3)}
          >
            3개 보기
          </Button>
        </div>
        {/* 슬라이드 영역 */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${translateX}%)`,
            width: `${(images.length / viewMode) * 100}%`, // 🔥 핵심 수정: width 재계산
          }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              style={{
                flex: `0 0 ${100 / images.length}%`, // 균등 비율 유지
                width: `${100 / viewMode}%`, // 보기모드별 이미지 크기 조정
                maxWidth: `${100 / viewMode}%`,
              }}
              className="px-1"
            >
              <CarouselItem src={src} alt={`Slide ${i + 1}`} />
            </div>
          ))}
        </div>

        {/* 이전 / 다음 버튼 */}
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

        {/* 인디케이터 */}
        <CarouselIndicator
          total={totalGroups}
          current={currentGroup}
          isPlaying={isPlaying}
          onTogglePlay={() => (isPlaying ? pauseAutoSlide() : startAutoSlide())}
        />
      </div>
    </>
  );
}
