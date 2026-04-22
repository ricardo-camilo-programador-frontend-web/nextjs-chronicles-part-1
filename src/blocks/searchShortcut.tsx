"use client";

import Image from "next/image";
import searchIcon from "@/assets/svg/search-icon.svg";
import DropdownSelect from "@/components/DropdownSelect";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import { isClickOutsideElement } from "@/utils/isClickOutsideElement";

interface SearchShortcutProps {
  className?: string;
  label?: string;
}

const options = [
  { label: "Plants", value: "plants" },
  { label: "Species", value: "species" },
  { label: "Genus", value: "genus" },
  { label: "Family", value: "family" },
];

export const SearchShortcut = ({ className, label }: SearchShortcutProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownListRef = useRef<HTMLDivElement>(null);

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  function handleClickOutside(event: MouseEvent) {
    const clickedOutsideDropdownList = isClickOutsideElement(dropdownListRef.current, event);

    if (clickedOutsideDropdownList) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <Button
        className={`mt-3 md:mt-0 px-2 py-1.5 hover:bg-white/10 transition-all duration-300 text-center flex items-center gap-2 border-none ${className}`}
        title={`Search for plants`}
        onClick={handleToggle}
      >
        <Image
          alt="Search icon"
          className="md:w-8 md:h-8 max-w-max max-h-[34px]"
          width={26}
          height={26}
          src={searchIcon}
        />
        {label}
      </Button>

      <div
        ref={dropdownListRef}
        className={`absolute left-0 top-[4rem] pr-2 min-w-[99vw] bg-white/20 backdrop-blur-sm z-[6] text-white border border-white/20 rounded-lg h-10 ${isOpen ? "block" : "hidden"}`}
      >
        <DropdownSelect name="searchShortcut" options={options} />
      </div>
    </>
  );
};
