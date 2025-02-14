"use client";
import type { FC } from "react";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { FaArrowUp } from "react-icons/fa";

interface ScrollToTopProps {
  className?: string;
}

const ScrollToTop: FC<ScrollToTopProps> = ({ className }) => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isVisible ? (
    <Button
      className={`fixed bottom-4 right-4 bg-primary text-white !rounded-full w-16 h-16 max-w-[4rem] max-h-[4rem] active:scale-95 z-[9999] ${className}`}
      onClick={scrollToTop}
    >
      <FaArrowUp />
    </Button>
  ) : null;
};

export default ScrollToTop;
