"use client";

import Button from "@/components/Button";
import { VideoModal } from "@/components/VideoModal";
import { useState } from "react";

interface LiveDemoShortcutProps {
  className?: string;
  videoUrl: string;
  buttonLabel: string;
  buttonTitle: string;
  text: string;
  modalTitle: string;
}

export function LiveDemoShortcut({
  className,
  videoUrl,
  buttonLabel,
  buttonTitle,
  text,
  modalTitle,
}: LiveDemoShortcutProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className={`min-w-[20rem] md:min-w-[13rem] group flex items-center gap-3 px-6 py-3 rounded-full w-full border-none ${className}`}
        aria-label={buttonLabel}
        title={buttonTitle}
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center justify-center gap-3 w-full">
          <div className="flex-shrink-0 relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-white rounded-full opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
          </div>

          <span className="text-white font-medium text-lg truncate">
            {text}...
          </span>
        </div>
      </Button>

      <VideoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        videoUrl={videoUrl}
        title={modalTitle}
      />
    </>
  );
}
