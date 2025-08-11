import React, { useEffect, useState } from "react";

function Toast({ message, duration = 1500, onClose }) {
  const [open, setOpen] = useState(Boolean(message));

  useEffect(() => {
    if (!message) return;
    setOpen(true);
    const t = setTimeout(() => {
      setOpen(false);
      onClose?.();
    }, duration);
    return () => clearTimeout(t);
  }, [message, duration, onClose]);

  if (!open) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        background: "var(--card)",
        color: "var(--text)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow)",
        padding: "10px 14px",
        borderRadius: 12,
        zIndex: 100,
      }}
    >
      {message}
    </div>
  );
}

export default Toast;
