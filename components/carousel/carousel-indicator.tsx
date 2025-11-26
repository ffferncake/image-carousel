import { Play, Pause } from "lucide-react";

interface CarouselIndicatorProps {
  total: number;
  current: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export function CarouselIndicator({
  total,
  current,
  isPlaying,
  onTogglePlay,
}: CarouselIndicatorProps) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
      <div className="flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              current === i
                ? "bg-white scale-110 shadow-lg"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* ✅ Manual click toggle */}
      <button
        onClick={onTogglePlay}
        className="flex items-center gap-1 text-white/80 text-sm font-medium hover:text-white transition"
      >
        {isPlaying ? (
          <>
            <Pause className="w-3.5 h-3.5 text-yellow-300" />
            <span>Pause</span>
          </>
        ) : (
          <>
            <Play className="w-3.5 h-3.5 text-green-400" />
            <span>Auto</span>
          </>
        )}
      </button>
    </div>
  );
}
