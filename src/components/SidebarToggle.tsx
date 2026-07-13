"use client";

export default function SidebarToggle() {
  const toggle = () => {
    window.dispatchEvent(new CustomEvent('toggle-sidebar'));
  };

  return (
    <button
      aria-label="Open sidebar"
      onClick={toggle}
      className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
