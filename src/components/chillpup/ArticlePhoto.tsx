import React from "react";
import Image from "next/image";

interface ArticlePhotoProps {
  src: string;
  alt: string;
  caption?: string;
  aspect?: "wide" | "portrait" | "square" | string;
  priority?: boolean;
  isHero?: boolean;
  variant?: "default" | "heroCompact" | "heroCompactWide" | "heroCompactPortrait";
  fit?: "cover" | "contain";
  imagePosition?: string;
  frameClassName?: string;
  imageClassName?: string;
  className?: string;
}

export function ArticlePhoto({
  src,
  alt,
  caption,
  aspect,
  priority = false,
  isHero = false,
  variant = "default",
  fit = "cover",
  imagePosition = "object-center",
  frameClassName = "",
  imageClassName = "",
  className = "",
}: ArticlePhotoProps) {
  const isHeroCompact =
    variant === "heroCompact" ||
    variant === "heroCompactWide" ||
    variant === "heroCompactPortrait";

  if (isHeroCompact) {
    // Determine default aspect based on variant
    let defaultAspect = "aspect-[16/10]";
    let heightClasses = "h-[200px] xs:h-[240px] sm:h-[280px] lg:h-[320px]";

    if (variant === "heroCompactPortrait") {
      defaultAspect = "aspect-[3/4]";
      heightClasses = "h-[320px] sm:h-[440px] lg:h-[560px]";
    }

    const aspectClass = aspect || defaultAspect;
    const fitClass = fit === "contain" ? "object-contain" : "object-cover";
    const bgClass = fit === "contain" ? "bg-slate-50/70" : "";

    return (
      <figure
        className={`w-fit max-w-full mx-auto rounded-[24px] border border-[#DCEFE8] bg-white p-2 shadow-sm ${frameClassName} ${className}`}
      >
        <div className={`relative overflow-hidden rounded-[18px] max-w-full ${aspectClass} ${heightClasses} ${bgClass}`}>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            unoptimized={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 640px"
            className={`${fitClass} ${imagePosition} ${imageClassName}`}
          />
        </div>
      </figure>
    );
  }

  let defaultAspect = "aspect-[16/9]";
  let widthClass = "w-full";
  if (aspect === "portrait") {
    defaultAspect = isHero ? "aspect-[4/3] lg:aspect-[3/4]" : "aspect-[3/4]";
    widthClass = "w-full max-w-md mx-auto";
  } else if (aspect === "square") {
    defaultAspect = isHero ? "aspect-[4/3] lg:aspect-square" : "aspect-square";
    widthClass = "w-full max-w-md mx-auto";
  } else if (aspect) {
    defaultAspect = aspect;
  } else {
    defaultAspect = isHero ? "aspect-[4/3] lg:aspect-[16/9]" : "aspect-[16/9]";
  }

  const wrapperClass = isHero ? "max-h-[280px] lg:max-h-none" : "";
  const fitClass = fit === "contain" ? "object-contain" : "object-cover";

  return (
    <figure
      className={`bg-white rounded-[28px] border border-[#DCEFE8] p-3 shadow-sm ${widthClass} ${frameClassName} ${className}`}
    >
      <div className={`relative overflow-hidden rounded-[20px] ${defaultAspect} ${wrapperClass}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          unoptimized={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`${fitClass} ${imagePosition} ${imageClassName}`}
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
