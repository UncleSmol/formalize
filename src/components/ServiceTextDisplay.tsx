"use client";

import { useState } from "react";
import Link from "next/link";
import { SERVICES } from "@/lib/services";

export function ServiceTextDisplay() {
  const [selectedService, setSelectedService] = useState(0);

  const currentService = SERVICES[selectedService];

  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-2">
      {/* Animated Text Display */}
      <div className="flex flex-col justify-center">
        <div className="rounded-2xl bg-gradient-to-br from-[#f7f4ff] to-[#f0ecff] p-8">
          {/* Icon */}
          <div
            className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${currentService.gradient} text-3xl text-white`}
          >
            <i className={currentService.icon} aria-hidden="true" />
          </div>

          {/* Title */}
          <h3 className="mt-6 text-3xl font-bold text-[#17142a]">
            {currentService.summary}
          </h3>

          {/* Description */}
          <p className="mt-4 text-lg text-[#4c466b] leading-relaxed">
            {currentService.description}
          </p>

          {/* Details List - Animated */}
          <div className="mt-8 space-y-2">
            {currentService.details.map((detail, index) => (
              <div
                key={index}
                className="animate-fade-in flex items-start gap-3 opacity-0"
                style={{
                  animation: `fadeIn 0.6s ease-out forwards`,
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div
                  className={`mt-1 flex-shrink-0 h-2 w-2 rounded-full bg-gradient-to-br ${currentService.gradient}`}
                />
                <span className="text-[#4c466b]">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Selection */}
      <div className="flex flex-col justify-between">
        {/* Service Buttons */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
          {SERVICES.map((service, index) => (
            <button
              key={service.id}
              onClick={() => setSelectedService(index)}
              className={`group rounded-xl px-6 py-4 font-semibold text-sm transition-all ${
                selectedService === index
                  ? `bg-gradient-to-r ${service.gradient} text-white shadow-lg scale-105`
                  : "bg-white text-[#4c466b] ring-1 ring-[#17142a]/10 hover:shadow-md hover:scale-102"
              }`}
            >
              <i className={`${service.icon} mr-2`} aria-hidden="true" />
              {service.title}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href={currentService.href}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[#2aa19d] px-8 py-4 font-bold text-white transition-colors hover:bg-[#17142a]"
        >
          Learn More About {currentService.title}
        </Link>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
