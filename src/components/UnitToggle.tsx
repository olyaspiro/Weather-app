// src/components/UnitToggle.tsx
import type { Units } from "./../types/weather";

interface Props {
  units: Units;
  onChange: (u: Units) => void;
}

export default function UnitToggle({ units, onChange }: Props) {
  return (
    <div className="unit-toggle">
      <button
        type="button"
        className={units === "metric" ? "active" : ""}
        onClick={() => onChange("metric")}
      >
        °C
      </button>
      <button
        type="button"
        className={units === "imperial" ? "active" : ""}
        onClick={() => onChange("imperial")}
      >
        °F
      </button>
    </div>
  );
}
