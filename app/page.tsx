import { Carousel } from "@/components/carousel/carousel";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-8">
      <div className="w-full max-w-3xl">
        <Carousel />
      </div>
    </main>
  );
}
