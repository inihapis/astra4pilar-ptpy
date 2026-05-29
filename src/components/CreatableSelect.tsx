import { useState, useRef, useEffect } from 'react';

interface CreatableSelectProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  className?: string;
}

export default function CreatableSelect({ name, value, onChange, options, placeholder = 'Pilih atau ketik...', className = '' }: CreatableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  const showCreateOption = search.trim() !== '' && !options.some(o => o.toLowerCase() === search.toLowerCase());

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <input
        type="text"
        name={name}
        value={isOpen ? search : value}
        placeholder={placeholder}
        onFocus={() => {
          setIsOpen(true);
          setSearch(value);
        }}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
        className="w-full border-gray-300 rounded-md shadow-sm p-2.5 border bg-white"
        autoComplete="off"
      />
      {/* Dropdown arrow */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </div>

      {isOpen && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {filteredOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setSearch(opt);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50 transition-colors ${value === opt ? 'bg-blue-50 font-medium text-[var(--color-astra-blue)]' : 'text-gray-700'}`}
            >
              {opt}
            </button>
          ))}
          {showCreateOption && (
            <button
              type="button"
              onClick={() => {
                onChange(search.trim());
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors border-t border-gray-100 font-medium"
            >
              + Tambahkan "{search.trim()}"
            </button>
          )}
          {filteredOptions.length === 0 && !showCreateOption && (
            <div className="px-3 py-2 text-sm text-gray-400">Tidak ada opsi ditemukan.</div>
          )}
        </div>
      )}
    </div>
  );
}
