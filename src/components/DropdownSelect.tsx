"use client";

import { FC, useState, useEffect, ChangeEvent } from "react";
import Label from "@/components/Label";
import ChevronButton from "@/components/AnimatedChevron";
import { getUniqueId } from "@/utils/getUniqueId";

interface Props {
  name: string;
  options: { label: string; value: string }[];
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  initialValue?: string | number;
  className?: string;
  onChange?: (value: string | number | null) => void;
  clearable?: boolean;
}

const DropdownSelect: FC<Props> = ({
  name,
  label,
  placeholder,
  initialValue,
  className,
  options,
  disabled,
  onChange,
  clearable = true,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleDropdown = () => {
    if (isDropdownOpen) {
      setSearchQuery("");
      setFilteredOptions(options);
    }
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSelect = (value: string | number) => {
    const selectedOption = options.find((option) => option.value === value);
    if (selectedOption) {
      setSelectedLabel(selectedOption.label);
      if (onChange) onChange(value);
    }
    setDropdownOpen(false);
    setSearchQuery("");
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchQuery(searchTerm);
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedLabel("");
    setSearchQuery("");
    if (onChange) onChange(null);
  };

  useEffect(() => {
    if (initialValue !== undefined) {
      const initialOption = options.find(
        (option) => option.value === initialValue
      );
      if (initialOption) {
        setSelectedLabel(initialOption.label);
      }
    } else if (options.length > 0) {
      setSelectedLabel(options[0].label);
    }
  }, [initialValue, options]);

  if (options.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-col w-full relative ${className}`}>
      {label && <Label value={label} htmlFor={name} />}
      <div
        role="button"
        className="d-input bg-transparent w-full flex items-center justify-center min-h-[41px] border-base-gray rounded-none disabled:bg-gray-200 disabled:border-base-gray disabled:cursor-not-allowed focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-200 delay-50 relative"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!disabled) {
              toggleDropdown();
            }
          }
        }}
      >
        <div className="flex items-center w-full">
          <div className="flex items-center w-full">
            <input
              name={name}
              className="p-2 w-full text-left focus:outline-none bg-transparent cursor-pointer"
              value={isDropdownOpen ? searchQuery : selectedLabel}
              onClick={(e) => {
                e.stopPropagation();
                if (!disabled) {
                  toggleDropdown();
                  if (isDropdownOpen && selectedLabel) {
                    setSearchQuery(selectedLabel);
                    setSelectedLabel("");
                  }
                }
              }}
              onChange={handleSearch}
              placeholder={placeholder}
              readOnly={!isDropdownOpen}
              disabled={disabled}
            />
            {clearable && selectedLabel && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="px-2 text-muted hover:text-red-600"
                aria-label="Limpar seleção"
              >
                ✕
              </button>
            )}
          </div>
          <div className="inset-y-0 right-0">
            <ChevronButton
              className="w-8 h-8 flex-row-reverse bg-transparent text-foreground"
              isOpen={isDropdownOpen}
              onToggle={toggleDropdown}
            />
          </div>
        </div>
      </div>
      {isDropdownOpen && (
        <div className="absolute top-full left-0 w-full place-self-start flex items-center justify-center px-6 py-2 border bg-primary/90 backdrop-blur-sm border-white/20 text-white rounded-lg transition-all duration-300 text-center disabled:cursor-not-allowed border-base-gray shadow-md max-h-[20rem] overflow-hidden overflow-y-auto -mt-1">
          <ul className="list-none py-2 w-full">
            {filteredOptions.map(({ label, value }, index) => (
              <li
                key={`${getUniqueId()}-${label}-${value}-${index}`}
                className="w-full"
              >
                <button
                  type="button"
                  className="min-w-full w-full p-2 text-left hover:bg-glass focus:outline-none rounded-lg"
                  onClick={() => handleSelect(value)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownSelect;
