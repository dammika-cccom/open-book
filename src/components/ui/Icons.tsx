/**
 * ARCHITECTURAL NOTE:
 * We use raw SVGs here to bypass the 3MB Cloudflare Worker limit.
 * This removes 'lucide-react' from the production bundle entirely.
 */
import React from "react";

const IconBase = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const MoveRightIcon = (p: { className?: string }) => <IconBase {...p}><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></IconBase>;
export const MoveLeftIcon = (p: { className?: string }) => <IconBase {...p}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></IconBase>;
export const ScrollTextIcon = (p: { className?: string }) => <IconBase {...p}><path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/></IconBase>;
export const CameraIcon = (p: { className?: string }) => <IconBase {...p}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></IconBase>;
export const Maximize2Icon = (p: { className?: string }) => <IconBase {...p}><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></IconBase>;
export const ChevronLeftIcon = (p: { className?: string }) => <IconBase {...p}><path d="m15 18-6-6 6-6"/></IconBase>;
export const ChevronRightIcon = (p: { className?: string }) => <IconBase {...p}><path d="m9 18 6-6-6-6"/></IconBase>;
export const ArrowUpIcon = (p: { className?: string }) => <IconBase {...p}><path d="m18 15-6-6-6 6"/></IconBase>;
export const HomeIcon = (p: { className?: string }) => <IconBase {...p}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></IconBase>;
export const ListIcon = (p: { className?: string }) => <IconBase {...p}><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></IconBase>;
export const LibraryIcon = (p: { className?: string }) => <IconBase {...p}><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></IconBase>;
export const LanguagesIcon = (p: { className?: string }) => <IconBase {...p}><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></IconBase>;
export const Share2Icon = (p: { className?: string }) => <IconBase {...p}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></IconBase>;
export const SearchIcon = (p: { className?: string }) => <IconBase {...p}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></IconBase>;
export const XIcon = (p: { className?: string }) => <IconBase {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></IconBase>;
export const MenuIcon = (p: { className?: string }) => <IconBase {...p}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></IconBase>;
export const BookMarkedIcon = (p: { className?: string }) => <IconBase {...p}><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"/><path d="M9 10h6"/></IconBase>;