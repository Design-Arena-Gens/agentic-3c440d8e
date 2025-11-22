"use client";

import type { CSSProperties } from "react";
import { PosterBlueprint, PosterLayer } from "@/lib/analyzer";

const layerBase = "absolute transition-transform duration-[1200ms] ease-out";

const toRgba = (hex: string, alpha = 1) => {
  const normalized = hex.replace("#", "");
  const num = parseInt(normalized, 16);
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const renderLayer = (layer: PosterLayer, index: number) => {
  const commonStyle: CSSProperties = {
    top: layer.top,
    left: layer.left,
    opacity: layer.opacity ?? 1,
    filter: layer.blur ? `blur(${layer.blur}px)` : undefined,
    transform: layer.rotate ? `rotate(${layer.rotate}deg)` : undefined,
    zIndex: layer.zIndex ?? index + 1,
    background: layer.gradient ?? layer.color,
  };

  switch (layer.type) {
    case "circle": {
      const size = layer.size ?? 160;
      return (
        <span
          key={`circle-${index}`}
          className={`${layerBase} rounded-full mix-blend-soft-light`}
          style={{
            ...commonStyle,
            width: size,
            height: size,
          }}
        />
      );
    }
    case "rect": {
      const width = layer.width ?? 220;
      const height = layer.height ?? 280;
      return (
        <span
          key={`rect-${index}`}
          className={`${layerBase} mix-blend-lighten`}
          style={{
            ...commonStyle,
            width,
            height,
            borderRadius:
              typeof layer.borderRadius === "number"
                ? layer.borderRadius
                : layer.borderRadius ?? "28px",
          }}
        />
      );
    }
    case "line": {
      const width = layer.width ?? 280;
      const height = layer.height ?? 2;
      return (
        <span
          key={`line-${index}`}
          className={`${layerBase} mix-blend-soft-light`}
          style={{
            ...commonStyle,
            width,
            height,
            borderRadius: layer.borderRadius ?? height,
          }}
        />
      );
    }
    case "ring": {
      const size = layer.size ?? 220;
      return (
        <span
          key={`ring-${index}`}
          className={`${layerBase} rounded-full mix-blend-lighten`}
          style={{
            ...commonStyle,
            width: size,
            height: size,
            background: "transparent",
            borderWidth: layer.borderWidth ?? 10,
            borderStyle: "solid",
            borderColor: layer.borderColor ?? layer.color,
          }}
        />
      );
    }
    case "triangle": {
      const size = layer.size ?? 240;
      return (
        <span
          key={`triangle-${index}`}
          className={layerBase}
          style={{
            ...commonStyle,
            width: size,
            height: size,
            background: "transparent",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            backgroundColor: layer.color,
          }}
        />
      );
    }
    default:
      return null;
  }
};

export const PosterCard = ({ poster }: { poster: PosterBlueprint }) => {
  const orientationClass =
    poster.orientation === "landscape" ? "aspect-[4/3]" : "aspect-[3/4]";
  const textStrong = toRgba(poster.textColor, 0.86);
  const textMuted = toRgba(poster.textColor, 0.56);
  const textAccent = toRgba(poster.textColor, 0.38);

  return (
    <article className="flex flex-col gap-3">
      <div
        className={`relative overflow-hidden rounded-[26px] border-[14px] shadow-xl ${orientationClass}`}
        style={{
          borderColor: poster.frameColor,
          background: poster.background,
        }}
      >
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/16" />
        {poster.layers.map((layer, index) => renderLayer(layer, index))}
        <div className="pointer-events-none absolute inset-x-6 bottom-6 text-right text-sm font-medium tracking-wide">
          <div
            className="uppercase text-xs font-semibold tracking-[0.24em]"
            style={{ color: textAccent }}
            dir="ltr"
          >
            {poster.description}
          </div>
          <div
            className="text-lg font-semibold leading-tight"
            style={{ color: textStrong }}
          >
            {poster.subtitle}
          </div>
          <div className="text-sm" style={{ color: textMuted }}>
            {poster.title}
          </div>
        </div>
      </div>
      <div className="flex justify-between text-xs text-white/80">
        <span className="font-medium">{poster.title}</span>
        <span>{poster.orientation === "landscape" ? "أفقي" : "عمودي"}</span>
      </div>
    </article>
  );
};

