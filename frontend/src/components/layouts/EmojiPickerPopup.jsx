import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 cursor-pointer text-sm text-gray-300 hover:text-white"
        onClick={() => setIsOpen(true)}
      >
        {icon ? (
          <span className="text-2xl">{icon}</span>
        ) : (
          <LuImage className="text-lg" />
        )}
        <p>{icon ? 'Change Icon' : 'Pick Icon'}</p>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg p-2">
          <div className="flex justify-end mb-1">
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <LuX />
            </button>
          </div>
          <EmojiPicker
            theme="dark"
            onEmojiClick={(emoji) => {
              console.log("Selected Emoji:", emoji);
              const selectedEmoji = emoji.emoji || emoji;
              onSelect(selectedEmoji);
              setIsOpen(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;