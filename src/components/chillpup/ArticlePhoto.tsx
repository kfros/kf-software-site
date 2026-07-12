import React from "react";
import Image from "next/image";

interface ArticlePhotoProps {
  src: string;
  alt: string;
  caption?: string;
  aspect?: "wide" | "portrait" | "square";
  priority?: boolean;
  isHero?: boolean;
  variant?: "default" | "heroCompact";
  className?: string;
}

export function ArticlePhoto({
  src,
  alt,
  caption,
  aspect = "wide",
  priority = false,
  isHero = false,
  variant = "default",
  className = "",
}: ArticlePhotoProps) {
  if (variant === "heroCompact") {
    return (
      <figure className={`max-w-2xl mx-auto rounded-[24px] border border-[#DCEFE8] bg-white p-2 shadow-sm ${className}`}>
        <div className="relative overflow-hidden rounded-[18px] aspect-[16/10] max-h-[240px] sm:max-h-[280px] lg:max-h-[320px]">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            unoptimized={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 640px"
            className="object-cover object-center"
          />
        </div>
      </figure>
    );
  }

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
