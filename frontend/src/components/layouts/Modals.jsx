import React from 'react'

const Modals = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
if(!isOpen) return
null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-zinc-900 text-white w-full max-w-lg rounded-lg shadow-xl p-6 transition-all duration-300">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-700 pb-3 mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modals