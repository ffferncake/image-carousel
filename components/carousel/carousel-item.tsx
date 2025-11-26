interface CarouselItemProps {
  src: string;
  alt: string;
}

export function CarouselItem({ src, alt }: CarouselItemProps) {
  return (
    <div className="flex-shrink-0 w-full h-[400px] relative">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-xl"
        draggable={false}
      />
    </div>
  );
}
