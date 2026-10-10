'use client';

import { useState, useEffect } from 'react';

export default function Notification({ message, type = 'info', onClose, duration = 4000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible || !message) return null;

  const bgColors = {
    success: 'bg-emerald-600 text-white',
    error: 'bg-rose-600 text-white',
    warning: 'bg-amber-500 text-white',
    info: 'bg-slate-900 text-white',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <div className={`px-4 py-3 rounded-xl font-medium text-xs shadow-2xl flex items-center gap-2 ${bgColors[type] || bgColors.info}`}>
        <span>{message}</span>
        <button
          onClick={() => {
            setVisible(false);
            if (onClose) onClose();
          }}
          className="ml-3 text-white/80 hover:text-white font-bold text-sm"
        >
          ×
        </button>
      </div>
    </div>
  );
}