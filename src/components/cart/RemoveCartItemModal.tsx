"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createPortal } from "react-dom";
import { CartItem } from "@/types/cartItem";
import { useTranslations } from "next-intl";
import Image from "next/image";

const DEFAULT_PRICE = "$59.99";

interface RemoveCartItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItem: CartItem;
  onConfirm: () => void;
}

export function RemoveCartItemModal({
  isOpen,
  onClose,
  cartItem,
  onConfirm,
}: RemoveCartItemModalProps) {
  const t = useTranslations("removeModal");
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const plant = cartItem.item;
  const displayName = plant.common_name || plant.scientific_name;

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

    // Auto focus first button
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
      aria-labelledby="remove-modal-title"
      aria-describedby="remove-modal-desc"
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
        {/* Bloco superior — Preview do produto */}
        <div className="relative bg-white/5 border-b border-white/10 p-4 flex items-center gap-4 overflow-hidden">
          {/* Detalhe decorativo folha */}
          <span className="absolute -bottom-2 -right-2 text-7xl opacity-[0.07] rotate-45 select-none pointer-events-none">
            🍃
          </span>

          {/* Thumbnail */}
          {plant.image_url && (
            <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src={plant.image_url}
                alt={displayName}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          )}

          {/* Info */}
          <div className="flex flex-col min-w-0 relative z-10">
            <p className="text-white font-semibold text-sm truncate" style={{ fontFamily: "Georgia, serif" }}>
              {displayName}
            </p>
            <p className="text-emerald-400 text-xs mt-0.5">
              {t("quantity", { qty: cartItem.quantity })} · {DEFAULT_PRICE}
            </p>
          </div>
        </div>

        {/* Bloco central — Corpo */}
        <div className="px-6 py-6 flex flex-col items-center text-center">
          {/* Ícone lixeira */}
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
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </div>

          {/* Título */}
          <h3
            id="remove-modal-title"
            className="text-white text-lg font-semibold mb-2"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {t("title")}
          </h3>

          {/* Descrição */}
          <p id="remove-modal-desc" className="text-white/50 text-sm leading-relaxed">
            {t.rich("description", {
              bold: (chunks) => (
                <strong className="text-emerald-400 font-semibold">{chunks}</strong>
              ),
              name: displayName,
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
          {/* Botão primário */}
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
            </svg>
            {t("confirmButton")}
          </button>

          {/* Botão secundário */}
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
