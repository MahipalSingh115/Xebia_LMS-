import React from "react";
import { FileText, Video, AlignLeft, BookOpen, Heading, Quote, Minus, Image, Code2, Download, Link2, ExternalLink, Volume2, AlertCircle, HelpCircle, CheckSquare } from "lucide-react";

const BLOCK_TYPE_MAP = {
  video: { label: "Video", icon: Video },
  pdf: { label: "PDF", icon: FileText },
  text: { label: "Article", icon: AlignLeft },
  heading: { label: "Heading", icon: Heading },
  quote: { label: "Quote", icon: Quote },
  divider: { label: "Divider", icon: Minus },
  image: { label: "Image", icon: Image },
  code: { label: "Code", icon: Code2 },
  download: { label: "Download", icon: Download },
  file: { label: "File", icon: FileText },
  link: { label: "Link", icon: Link2 },
  embed: { label: "Embed", icon: ExternalLink },
  callout: { label: "Callout", icon: AlertCircle },
  audio: { label: "Audio", icon: Volume2 },
  quiz: { label: "Quiz", icon: HelpCircle },
  assignment: { label: "Assignment", icon: CheckSquare },
};

export const getContentType = (blockOrSub) => {
  if (!blockOrSub) return null;
  const content = (blockOrSub.blockType !== undefined || blockOrSub.subModuleId !== undefined)
    ? blockOrSub
    : (blockOrSub.content || blockOrSub.blocks?.[0]);
  if (!content) return null;
  const bt = content.blockType;
  if (bt && BLOCK_TYPE_MAP[bt]) return bt;
  // Legacy fallback
  if (content.pdfUrl) return "pdf";
  if (content.videoUrl) return "video";
  if (content.content) return "text";
  return null;
};

export const getContentLabel = (blockOrSub) => {
  const t = getContentType(blockOrSub);
  if (t && BLOCK_TYPE_MAP[t]) return BLOCK_TYPE_MAP[t].label;
  return "No content";
};

export const getContentIcon = (blockOrSub, size = 13) => {
  const t = getContentType(blockOrSub);
  if (t && BLOCK_TYPE_MAP[t]) return React.createElement(BLOCK_TYPE_MAP[t].icon, { size });
  return React.createElement(BookOpen, { size });
};

export const getEmbedInfo = (url) => {
  if (!url) return null;
  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.toLowerCase();
    if (host.includes("youtube.com") || host.includes("youtu.be")) {
      let vId = host.includes("youtu.be") ? parsedUrl.pathname.substring(1) : parsedUrl.searchParams.get("v");
      if (vId) return { type: "youtube", url: `https://www.youtube.com/embed/${vId}` };
    }
    if (host.includes("vimeo.com")) {
      const vId = parsedUrl.pathname.substring(1);
      if (vId) return { type: "vimeo", url: `https://player.vimeo.com/video/${vId}` };
    }
    return { type: "direct", url };
  } catch {
    return null;
  }
};
