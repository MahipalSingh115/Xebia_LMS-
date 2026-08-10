import React, { useState } from "react";
import { ExternalLink, Video } from "lucide-react";
import { getEmbedInfo } from "@/features/courses/utils/curriculumHelpers";

/**
 * Renders video embeds with a fallback when iframes are blocked by extensions.
 */
export default function SafeMediaEmbed({ url, title = "Video preview" }) {
  const [embedBlocked, setEmbedBlocked] = useState(false);
  const embedInfo = getEmbedInfo(url);

  if (!embedInfo) {
    return (
      <div className="text-center text-slate-500 space-y-2">
        <Video size={36} className="mx-auto text-slate-600 animate-[pulse_2s_infinite]" />
        <p className="text-[12px] font-bold">Raw Video Stream Loaded</p>
        <p className="text-[10px] text-slate-600">Video embedding requires standard streaming providers</p>
      </div>
    );
  }

  if (embedInfo.type === "youtube" || embedInfo.type === "vimeo") {
    if (embedBlocked) {
      return (
        <div className="flex flex-col items-center justify-center gap-3 p-6 text-center text-slate-300">
          <Video size={32} className="text-slate-500" />
          <p className="text-[12px] font-semibold text-slate-400">
            Video preview blocked by a browser extension
          </p>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/15 rounded-lg text-[11px] font-bold text-white transition-colors"
          >
            <ExternalLink size={12} /> Open video in new tab
          </a>
        </div>
      );
    }

    return (
      <iframe
        src={embedInfo.url}
        title={title}
        className="w-full h-full border-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        onError={() => setEmbedBlocked(true)}
      />
    );
  }

  return (
    <video controls src={embedInfo.url} className="w-full h-full object-contain" title={title}>
      <track kind="captions" />
    </video>
  );
}
