interface CarouselItemProps {
  src: string;
  alt: string;
}

export function CarouselItem({ src, alt }: CarouselItemProps) {
  return (
    <div className="relative h-[400px] w-full flex items-center justify-center overflow-hidden rounded-xl bg-[#0e162b]">
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="w-full h-full object-cover rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-[1.02]"
      />
    </div>
  );
}
