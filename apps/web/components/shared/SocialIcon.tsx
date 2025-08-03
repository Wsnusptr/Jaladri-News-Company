// apps/web/components/shared/SocialIcon.tsx
import { icons } from 'lucide-react';

type IconName = keyof typeof icons;

interface SocialIconProps {
  name: string;
  size?: number;
}

export function SocialIcon({ name, size = 16 }: SocialIconProps) {
  const LucideIcon = icons[name as IconName];

  if (!LucideIcon) {
    return null;
  }

  return <LucideIcon size={size} />;
}