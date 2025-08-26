// src/components/SearchBar.tsx
import { useState } from "react";

interface Props {
  onSearch: (city: string) => void;
  defaultValue?: string;
}

export default function SearchBar({ onSearch, defaultValue = "" }: Props) {
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSearch(value.trim());
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search city..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
