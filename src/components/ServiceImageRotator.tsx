"use client";

import { useState } from "react";
import Link from "next/link";
import { SERVICES } from "@/lib/services";

export function ServiceImageRotator() {
  const [selectedService, setSelectedService] = useState(0);

  const currentService = SERVICES[selectedService];

  return (
    <div className="mt-16 grid gap-12 lg:grid-cols-2">
      {/* Text Display — Simple, no animation */}
      <div className="flex items-center rounded-lg bg-[#f5f5f5] p-10 border border-[#e0dce6]">
        <div className="w-full space-y-4">
          {currentService.details.slice(0, 6).map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#2aa19d] flex-shrink-0" />
              <span className="text-[#4c466b] text-sm leading-relaxed">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Service Info */}
      <div className="flex flex-col justify-between">
        {/* Service Details */}
        <div>
          <h3 className="text-2xl font-bold text-[#17142a]">
            {currentService.title}
          </h3>
          <p className="mt-2 text-[#4c466b] font-medium">
            {currentService.description}
          </p>
          <p className="mt-3 text-sm text-[#4c466b] leading-relaxed">
            {currentService.intro}
          </p>
        </div>

        {/* Service Buttons */}
        <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {SERVICES.map((service, index) => (
            <button
              key={service.id}
              onClick={() => setSelectedService(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedService === index
                  ? "bg-[#2aa19d] text-white"
                  : "bg-white text-[#4c466b] border border-[#e0dce6] hover:border-[#2aa19d] hover:text-[#2aa19d]"
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={currentService.href}
          className="mt-8 inline-block px-6 py-3 bg-[#2aa19d] text-white font-medium rounded-lg hover:bg-[#229385] transition-colors text-sm"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
}
