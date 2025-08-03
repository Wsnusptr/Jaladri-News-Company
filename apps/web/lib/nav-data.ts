// apps/web/lib/nav-data.ts

import {
  Flame, Newspaper, Tv, Gamepad2, Car, UtensilsCrossed, Briefcase, HeartPulse,
  ShoppingBag, Camera, GraduationCap, Building2, Drama, Anchor,
  Landmark, Plane, Home, Users, Clapperboard, Award, Handshake, Link,
  LogIn, UserPlus
} from 'lucide-react';

// Anda bisa mengganti 'any' dengan tipe ikon yang lebih spesifik jika perlu
export interface NavLink {
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  isNew?: boolean;
}

export const mainLinks: NavLink[] = [
  { label: 'Jaladricom', href: '/', icon: Home },
  { label: 'Terpopuler', href: '/terpopuler', icon: Flame },
  { label: 'Live TV', href: '/live-tv', icon: Tv },
  { label: 'Kirim Tulisan', href: '/kirim-tulisan', icon: Newspaper },
];

export const authLinks: NavLink[] = [
  { label: 'Masuk', href: '/login', icon: LogIn },
  { label: 'Daftar MPC', href: '/register', icon: UserPlus },
];

export const newsCategories: NavLink[] = [
  { label: 'JaladriNews', href: '/news', icon: Newspaper },
  { label: 'Sosial', href: '/finance', icon: Landmark },
  { label: 'Budaya', href: '/inet', icon: Link },
  { label: 'SosPol', href: '/hot', icon: Flame },
  { label: 'Hukum', href: '/sport', icon: Gamepad2 },
  { label: 'Ekonomi', href: '/sepakbola', icon: Anchor },
  { label: 'Lingkungan', href: '/oto', icon: Car },
  { label: 'Olahraga', href: '/travel', icon: Plane },
  { label: 'Kuliner', href: '/food', icon: UtensilsCrossed },
  { label: 'Pendidikan', href: '/health', icon: HeartPulse },
  { label: 'Kesehatan', href: '/wolipop', icon: ShoppingBag },
  { label: 'Properti', href: '/Jaladri-x', icon: Clapperboard },
  { label: 'Busines', href: '/20Jaladri', icon: Tv },
];

export const regionalNews: NavLink[] = [
    { label: 'JaladriJateng', href: '/jateng', icon: Landmark },
    { label: 'JaladriJatim', href: '/jatim', icon: Landmark },
    { label: 'JaladriJabar', href: '/jabar', icon: Landmark },
    { label: 'JaladriSulsel', href: '/sulsel', icon: Landmark },
    { label: 'JaladriSumut', href: '/sumut', icon: Landmark },
    { label: 'JaladriBali', href: '/bali', icon: Landmark },
    { label: 'JaladriSumbagsel', href: '/sumbagsel', icon: Landmark },
    { label: 'JaladriJogja', href: '/jogja', icon: Landmark },
    { label: 'JaladriKalimantan', href: '/kalimantan', icon: Landmark, isNew: true },
];

export const services: NavLink[] = [
  { label: 'For Your Business', href: '/bisnis', icon: Briefcase, isNew: true },
  // ... Tambahkan layanan lainnya di sini
];

export const network: NavLink[] = [
  { label: 'JaladriNetwork', href: 'https://www.cnnindonesia.com', icon: Users },
  // ... Tambahkan jaringan lainnya di sini
];

export const tertiaryNavLinks = [
    { label: 'Adsmart', href: '#', hasIndicator: false },
    { label: 'JaladriX', href: '#', hasIndicator: false },
    { label: 'Sepakbola', href: '#', hasIndicator: false },
    { label: 'Hikmah', href: '#', hasIndicator: false },
    { label: 'Edu', href: '#', hasIndicator: false },
    { label: 'Properti', href: '#', hasIndicator: false },
    { label: 'Pop', href: '#', hasIndicator: false },
    { label: 'JaladriJateng-Jogja Awards 2025', href: '#', hasIndicator: true },
    { label: 'FYB', href: '#', hasIndicator: false },
    { label: 'Hoegeng Awards', href: '#', hasIndicator: false },
    { label: 'Adhyaksa Awards', href: '#', hasIndicator: true },
];