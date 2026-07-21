"use client";

import { useState } from "react";

interface PasswordInputProps {
  id: string;
  label: string;
  placeholder?: string;
  minLength?: number;
}

export function PasswordInput({ id, label, placeholder, minLength }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-bold uppercase tracking-wide text-white/60">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          required
          minLength={minLength}
          className="w-full border border-white/12 bg-white/6 px-4 py-3 pr-11 text-sm text-white placeholder-white/30 focus:border-primary focus:outline-none"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white/70"
          aria-label={visible ? "Hide password" : "Show password"}
          tabIndex={-1}
        >
          <i className={`bi ${visible ? "bi-eye-slash" : "bi-eye"} text-lg`} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
