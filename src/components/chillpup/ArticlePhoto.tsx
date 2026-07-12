import React from "react";
import Image from "next/image";

interface ArticlePhotoProps {
  src: string;
  alt: string;
  caption?: string;
  aspect?: "wide" | "portrait" | "square";
  priority?: boolean;
  className?: string;
}

export function ArticlePhoto({
  src,
  alt,
  caption,
  aspect = "wide",
  priority = false,
  className = "",
}: ArticlePhotoProps) {
  let aspectClass = "aspect-[16/9]";
  let widthClass = "w-full";
  if (aspect === "portrait") {
    aspectClass = "aspect-[3/4]";
    widthClass = "w-full max-w-md mx-auto";
  } else if (aspect === "square") {
    aspectClass = "aspect-square";
    widthClass = "w-full max-w-md mx-auto";
  }

  return (
    <figure className={`bg-white rounded-[28px] border border-[#DCEFE8] p-3 shadow-sm ${widthClass} ${className}`}>
      <div className={`relative overflow-hidden rounded-[20px] ${aspectClass}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          unoptimized={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 px-2 text-sm leading-6 text-[#526174] italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
