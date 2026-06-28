"use client";

export default function StickyVideoBackground() {
  return (
    <div
      className="fixed inset-0 h-screen w-screen overflow-hidden"
      style={{ zIndex: -1 }}
    >
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src="/main-bg-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#17142a]/70" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,79,163,0.38),transparent_32%),radial-gradient(circle_at_80%_15%,rgba(0,209,255,0.28),transparent_30%),linear-gradient(135deg,rgba(255,232,79,0.18),rgba(255,255,255,0)_45%)]"
        aria-hidden="true"
      />
    </div>
  );
}
