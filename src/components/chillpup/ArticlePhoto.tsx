import React from "react";
import Image from "next/image";

interface ArticlePhotoProps {
  src: string;
  alt: string;
  caption?: string;
  aspect?: "wide" | "portrait" | "square";
  priority?: boolean;
  isHero?: boolean;
  className?: string;
}

export function ArticlePhoto({
  src,
  alt,
  caption,
  aspect = "wide",
  priority = false,
  isHero = false,
  className = "",
}: ArticlePhotoProps) {
  let aspectClass = "aspect-[16/9]";
  let widthClass = "w-full";
  if (aspect === "portrait") {
    aspectClass = isHero ? "aspect-[4/3] lg:aspect-[3/4]" : "aspect-[3/4]";
    widthClass = "w-full max-w-md mx-auto";
  } else if (aspect === "square") {
    aspectClass = isHero ? "aspect-[4/3] lg:aspect-square" : "aspect-square";
    widthClass = "w-full max-w-md mx-auto";
  } else {
    aspectClass = isHero ? "aspect-[4/3] lg:aspect-[16/9]" : "aspect-[16/9]";
  }

  const wrapperClass = isHero ? "max-h-[280px] lg:max-h-none" : "";

  return (
    <figure className={`bg-white rounded-[28px] border border-[#DCEFE8] p-3 shadow-sm ${widthClass} ${className}`}>
      <div className={`relative overflow-hidden rounded-[20px] ${aspectClass} ${wrapperClass}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          unoptimized={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center"
        />
      </div>
      {caption && (
        <figcaption className={`mt-3 px-2 text-sm leading-6 text-[#526174] italic ${isHero ? "hidden lg:block" : ""}`}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
