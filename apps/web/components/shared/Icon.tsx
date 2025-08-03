// apps/web/components/shared/Icon.tsx
import { icons } from 'lucide-react';

// Tipe ini akan membantu TypeScript mengetahui bahwa 'name' adalah nama ikon yang valid
type IconName = keyof typeof icons;

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

export function Icon({ name, className, size }: IconProps) {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    return null; // Atau render ikon default jika nama tidak ditemukan
  }

  return <LucideIcon className={className} size={size} />;
};