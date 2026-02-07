import { useEffect, useState } from "react";

export function CopyProtection() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const showCopyWarning = () => {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 500);
    };

    // Disable copy
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      showCopyWarning();
    };

    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showCopyWarning();
    };

    // Disable text selection on mobile (long press)
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      showCopyWarning();
    };

    // Disable keyboard shortcuts for copying
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C' || e.key === 'a' || e.key === 'A' || e.key === 'x' || e.key === 'X')) {
        e.preventDefault();
        showCopyWarning();
      }
    };

    document.addEventListener('copy', handleCopy);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('keydown', handleKeyDown);

    // Apply CSS to disable text selection
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    (document.body.style as any).msUserSelect = 'none';
    (document.body.style as any).MozUserSelect = 'none';

    return () => {
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    };
  }, []);

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center bg-destructive/20 animate-pulse">
      <div className="bg-destructive text-destructive-foreground px-6 py-4 rounded-lg shadow-2xl font-semibold text-lg">
        ⚠️ Copying is not allowed!
      </div>
    </div>
  );
}
