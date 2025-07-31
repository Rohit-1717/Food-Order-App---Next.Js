"use client";

const countryCodes = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
];

export default function CountryCodeSelector({
  value,
  setValue,
}: {
  value: string;
  setValue: (code: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="border px-2 py-2 rounded-md text-sm bg-muted text-foreground"
    >
      {countryCodes.map((country) => (
        <option key={country.code} value={country.code}>
          {country.flag} {country.code}
        </option>
      ))}
    </select>
  );
}
