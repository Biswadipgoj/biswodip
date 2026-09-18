'use client';

import Image from 'next/image';
import { personal } from '@/lib/data';

export default function ContactFinalPhoto() {
  return (
    <section
      id="contact"
      className="relative w-full py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      <div className="max-w-5xl mx-auto">
        {/* Editorial Container */}
        <div className="glass-panel p-8 md:p-12 border-white/20 shadow-2xl flex flex-col lg:flex-row items-center gap-10 md:gap-12">
          {/* Final Photo: Quiet, Editorial, Confident */}
          <div className="relative w-52 h-68 sm:w-60 sm:h-76 lg:w-68 lg:h-84 rounded-3xl overflow-hidden border border-white/20 shadow-2xl shrink-0">
            <Image
              src="/biswodip.png"
              alt="Biswodip Goj"
              fill
              className="object-cover object-top filter contrast-[1.02]"
              sizes="(max-width: 1024px) 240px, 300px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#151930]/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 py-1.5 px-3 rounded-xl bg-white/30 backdrop-blur-md text-center border border-white/40 shadow-sm">
              <span className="mono text-[10px] text-[#10b981] font-bold tracking-wider">
                FULL-STACK ENGINEER · WEST BENGAL
              </span>
            </div>
          </div>

          {/* Contact Details & Direct Connections */}
          <div className="space-y-5 text-center lg:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/[0.15]">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span className="mono text-xs font-semibold text-[#00d2ff]">
                OPEN FOR OPPORTUNITIES
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white">
              Let&apos;s Build Software That Ships.
            </h2>

            <p className="text-sm md:text-base text-[#cbd5e1] leading-relaxed max-w-xl">
              I am available for full-stack software engineering roles, technical collaboration, and product builds. Whether you need end-to-end web architecture, real-time messaging, or database-backed tools, let&apos;s connect directly.
            </p>

            {/* Direct Information Tags */}
            <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs mono text-[#cbd5e1]">
              <span className="px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.15]">
                📍 {personal.location}
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.15] text-[#10b981]">
                ⚡ Direct Inquiries Welcome
              </span>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href={`mailto:${personal.email}`}
                className="btn-primary-action text-sm py-2.5 px-6"
              >
                <span>Email {personal.email}</span>
                <span aria-hidden="true">✉</span>
              </a>

              <a
                href="https://github.com/Biswadipgoj"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-action text-sm py-2.5 px-5"
              >
                <span>GitHub</span>
                <span aria-hidden="true">↗</span>
              </a>

              <a
                href="https://linkedin.com/in/biswodipgoj"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-action text-sm py-2.5 px-5"
              >
                <span>LinkedIn</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Closing Narrative Line */}
        <div className="mt-14 text-center mono text-xs text-[#64748b]">
          WORKSTATION · CODE · ARCHITECTURE · SYSTEMS FLEET · BENCHMARKS · CONTACT
        </div>
      </div>
    </section>
  );
}
