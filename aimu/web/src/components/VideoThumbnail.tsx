"use client";

import { useState } from "react";
import { urlFor } from "@/sanity/image";
import type { SanityImageSource } from "@sanity/image-url";

function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : null;
}

export function VideoThumbnail({
  photo,
  videoUrl,
  alt,
}: {
  photo: SanityImageSource | null | undefined;
  videoUrl: string | null | undefined;
  alt: string;
}) {
  const [playing, setPlaying] = useState(false);
  const embedUrl = videoUrl ? getYouTubeEmbedUrl(videoUrl) : null;

  if (playing && embedUrl) {
    return (
      <div className="aspect-square w-full overflow-hidden rounded-2xl shadow-lg">
        <iframe
          src={embedUrl}
          title={alt}
          allow="accelerate-compute; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-lg">
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={urlFor(photo).width(800).height(800).url()} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-light-gray text-navy/30">Photo</div>
      )}
      {embedUrl && (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Play video"
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-white/30 backdrop-blur transition-transform hover:scale-110"
        >
          <span
            className="ml-1"
            style={{
              width: 0,
              height: 0,
              borderTop: "10px solid transparent",
              borderBottom: "10px solid transparent",
              borderLeft: "16px solid white",
            }}
          />
        </button>
      )}
    </div>
  );
}
