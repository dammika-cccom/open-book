import React from "react";

const IconBase = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

// --- NAVIGATION & UI ---
export const SearchIcon = (p: { className?: string }) => <IconBase {...p}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></IconBase>;
export const XIcon = (p: { className?: string }) => <IconBase {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></IconBase>;
export const MenuIcon = (p: { className?: string }) => <IconBase {...p}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></IconBase>;
export const ChevronLeftIcon = (p: { className?: string }) => <IconBase {...p}><path d="m15 18-6-6 6-6"/></IconBase>;
export const ChevronRightIcon = (p: { className?: string }) => <IconBase {...p}><path d="m9 18 6-6-6-6"/></IconBase>;
export const MoveLeftIcon = (p: { className?: string }) => <IconBase {...p}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></IconBase>;
export const MoveRightIcon = (p: { className?: string }) => <IconBase {...p}><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></IconBase>;
export const ArrowUpIcon = (p: { className?: string }) => <IconBase {...p}><path d="m18 15-6-6-6 6"/></IconBase>;
export const HomeIcon = (p: { className?: string }) => <IconBase {...p}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></IconBase>;
export const ListIcon = (p: { className?: string }) => <IconBase {...p}><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></IconBase>;
export const LibraryIcon = (p: { className?: string }) => <IconBase {...p}><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></IconBase>;
export const LanguagesIcon = (p: { className?: string }) => <IconBase {...p}><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></IconBase>;

// --- CONTENT & BRANDING ---
export const ScrollIcon = (p: { className?: string }) => <IconBase {...p}><path d="M19 17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2Z"/><path d="M7 19h10"/><path d="M15 9H9"/></IconBase>;
export const ScrollTextIcon = (p: { className?: string }) => <IconBase {...p}><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/></IconBase>;
export const BookOpenIcon = (p: { className?: string }) => <IconBase {...p}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></IconBase>;
export const CompassIcon = (p: { className?: string }) => <IconBase {...p}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.83 12.01 10.58 13.42 11.99 9.17 16.24 7.76"/></IconBase>;
export const CameraIcon = (p: { className?: string }) => <IconBase {...p}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></IconBase>;
export const Maximize2Icon = (p: { className?: string }) => <IconBase {...p}><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></IconBase>;
export const QuoteIcon = (p: { className?: string }) => <IconBase {...p}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 2.5 1 4.5 4 6"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 2.5 1 4.5 4 6"/></IconBase>;
export const AwardIcon = (p: { className?: string }) => <IconBase {...p}><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></IconBase>;
export const CalendarIcon = (p: { className?: string }) => <IconBase {...p}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></IconBase>;
export const Share2Icon = (p: { className?: string }) => <IconBase {...p}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></IconBase>;

// --- ADMIN & INTERACTIVE ---
export const ShieldAlertIcon = (p: { className?: string }) => <IconBase {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M12 8v4"/><path d="M12 16h.01"/></IconBase>;
export const ShieldCheckIcon = (p: { className?: string }) => <IconBase {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></IconBase>;
export const UsersIcon = (p: { className?: string }) => <IconBase {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></IconBase>;
export const MessageCircleIcon = (p: { className?: string }) => <IconBase {...p}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></IconBase>;
export const MessageSquareIcon = (p: { className?: string }) => <IconBase {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></IconBase>;
export const ClockIcon = (p: { className?: string }) => <IconBase {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></IconBase>;
export const FilterIcon = (p: { className?: string }) => <IconBase {...p}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></IconBase>;
export const Trash2Icon = (p: { className?: string }) => <IconBase {...p}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></IconBase>;
export const CheckCircleIcon = (p: { className?: string }) => <IconBase {...p}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></IconBase>;
export const TrophyIcon = (p: { className?: string }) => <IconBase {...p}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></IconBase>;
export const BookMarkedIcon = (p: { className?: string }) => <IconBase {...p}><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"/><path d="M9 10h6"/></IconBase>;
export const AlertCircleIcon = (p: { className?: string }) => <IconBase {...p}><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></IconBase>;