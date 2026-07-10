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
      <div className="absolute inset-0 bg-[#08080c]/42" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,79,163,0.24),transparent_32%),radial-gradient(circle_at_80%_15%,rgba(0,209,255,0.2),transparent_30%),linear-gradient(135deg,rgba(var(--primary-rgb),0.12),rgba(255,255,255,0)_45%)]"
      />
    </div>
  );
}
