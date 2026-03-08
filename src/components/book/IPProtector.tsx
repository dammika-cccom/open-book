"use client";

import React, { useEffect } from "react";

export function IPProtector({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Block Right Click
    const preventContextMenu = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      }
      e.preventDefault();
    };

    // 2. Block Keyboard Shortcuts (Copy, Save, View Source)
    const preventShortcuts = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey && (e.key === "c" || e.key === "u" || e.key === "s" || e.key === "p")) ||
        e.key === "F12"
      ) {
        e.preventDefault();
        alert("This content is protected intellectual property.");
      }
    };

    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("keydown", preventShortcuts);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("keydown", preventShortcuts);
    };
  }, []);

  return (
    <div className="select-none no-print">
      {children}
    </div>
  );
}