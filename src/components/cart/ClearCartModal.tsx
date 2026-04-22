"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";

interface ClearCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemCount: number;
}

export function ClearCartModal({
  isOpen,
  onClose,
  onConfirm,
  itemCount,
}: ClearCartModalProps) {
  const t = useTranslations("clearCartModal");
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConfirm = useCallback(() => {
    onConfirm();
    onClose();
  }, [onConfirm, onClose]);

  // Focus trap + Escape
  useEffect(() => {
    if (!isOpen) return;

    triggerRef.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      const firstBtn = modalRef.current?.querySelector<HTMLElement>("button");
      firstBtn?.focus();
    }, 100);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      clearTimeout(timer);
      triggerRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const modal = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="clear-cart-modal-title"
      aria-describedby="clear-cart-modal-desc"
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-[400px] max-h-[90dvh] overflow-y-auto bg-[#1a2e1a] border border-white/10 rounded-3xl shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bloco superior — Resumo */}
        <div className="relative bg-white/5 border-b border-white/10 p-4 flex items-center gap-4 overflow-hidden">
          {/* Detalhe decorativo */}
          <span className="absolute -bottom-2 -right-2 text-7xl opacity-[0.07] rotate-12 select-none pointer-events-none">
            🧹
          </span>

          {/* Ícone */}
          <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-amber-400"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </div>

          {/* Info */}
          <div className="flex flex-col min-w-0 relative z-10">
            <p className="text-white font-semibold text-sm" style={{ fontFamily: "Georgia, serif" }}>
              {t("summaryTitle")}
            </p>
            <p className="text-amber-400 text-xs mt-0.5">
              {t("itemCount", { count: itemCount })}
            </p>
          </div>
        </div>

        {/* Bloco central — Corpo */}
        <div className="px-6 py-6 flex flex-col items-center text-center">
          {/* Ícone alerta */}
          <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/20 flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-400"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
          </div>

          {/* Título */}
          <h3
            id="clear-cart-modal-title"
            className="text-white text-lg font-semibold mb-2"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {t("title")}
          </h3>

          {/* Descrição */}
          <p id="clear-cart-modal-desc" className="text-white/50 text-sm leading-relaxed">
            {t.rich("description", {
              bold: (chunks) => (
                <strong className="text-amber-400 font-semibold">{chunks}</strong>
              ),
              count: itemCount,
            })}
          </p>
        </div>

        {/* Divisor */}
        <div className="flex items-center px-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="px-3 text-[10px] text-white/30 uppercase tracking-[0.2em]">
            {t("divider")}
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Bloco inferior — Ações */}
        <div className="p-6 flex flex-col gap-3">
          <button
            onClick={handleConfirm}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl font-medium text-sm transition-all duration-300 shadow-lg shadow-red-500/25"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
            {t("confirmButton")}
          </button>

          <button
            onClick={onClose}
            className="w-full border border-white/15 text-white/50 hover:text-white/70 py-3 rounded-xl text-sm transition-all duration-300"
          >
            {t("cancelButton")}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
