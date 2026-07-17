/* eslint-disable @next/next/no-img-element */

/**
 * Shows the full image regardless of its aspect ratio: the photo is contained
 * within the frame while a blurred, zoomed copy of itself fills the space
 * behind it. Images that already match the frame's ratio render edge-to-edge
 * exactly like `object-cover`.
 */
export function BlendImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-lg"
      />
      <img src={src} alt={alt} className="relative h-full w-full object-contain" />
    </div>
  );
}
