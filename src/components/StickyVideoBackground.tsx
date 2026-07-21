"use client";

export default function StickyVideoBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen overflow-hidden"
      aria-hidden="true"
    >
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/main-bg-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#08080c]/60" />
    </div>
  );
}
