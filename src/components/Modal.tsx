"use client";

import type { FC } from "react";
import { ReactNode, useEffect, useRef, useState } from "react";

interface ModalProps {
  id: string;
  isOpen: boolean;
  title?: string;
  children?: ReactNode;
  isModal?: boolean;
  className?: string;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({
  id,
  title,
  isOpen,
  onClose,
  children,
  className,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const dialog = modalRef.current;
    setIsMounted(true);

    return () => {
      if (dialog?.open) {
        dialog.close();
      }
    };
  }, []);

  useEffect(() => {
    const dialog = modalRef.current;

    if (!dialog || !isMounted) return;

    try {
      if (isOpen) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    } catch (error) {
      console.error('Modal operation failed:', error);
    }
  }, [isOpen, isMounted,]);

  if (!isMounted) return null;

  return (
    <dialog
      ref={modalRef}
      id={id}
      className={`bg-white dark:bg-gray-800 text-black dark:text-gray-100 p-2 md:p-6 rounded-lg border border-white/20 backdrop:bg-black/50 open:animate-fade-in ${className}`}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex flex-col gap-4 min-w-[300px]">
        <header className="flex items-center justify-between border-b border-white/20 dark:border-gray-700 pb-2">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-black/80 dark:text-gray-300 hover:text-red-500"
            aria-label="Close modal"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </header>
        {children}
      </div>
    </dialog>
  );
};
