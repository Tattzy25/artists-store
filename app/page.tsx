import type { Metadata } from "next";
import { Suspense } from "react";
import { Results } from "@/components/results";
import { UploadedImagesProvider } from "@/components/uploaded-images-provider";

export const metadata: Metadata = {
  title: "vectr",
  description: "vectr",
};

const ImagesSkeleton = () => (
  <div className="gap-4 sm:columns-2 md:columns-3 lg:columns-4">
    {Array.from({ length: 9 }, (_, idx) => (
      <div 
        className="mb-4 rounded-xl bg-card p-2 shadow-xl h-[616px] w-full" 
        key={`skeleton-${idx}`} 
      />
    ))}
  </div>
);

const Home = () => (
  <UploadedImagesProvider>
    <div className="relative px-[5px] py-8">
      <Suspense fallback={<ImagesSkeleton />}>
        <Results />
      </Suspense>
    </div>
  </UploadedImagesProvider>
);

export default Home;
