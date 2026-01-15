interface MessageInputProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
}

export default function MessageInput({ value, onChange, onSend }: MessageInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="p-3 md:p-4 bg-gray-100 border-t border-gray-300 flex gap-2 sticky bottom-0">
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 md:py-3 outline-none focus:ring-2 focus:ring-green-400 text-sm md:text-base text-black placeholder-gray-500"
      />
      <button
        onClick={onSend}
        disabled={!value.trim()}
        className={`px-4 md:px-6 py-2 md:py-3 rounded-full text-white font-semibold text-sm md:text-base transition-colors duration-200 touch-manipulation
          ${value.trim()
            ? "bg-green-500 hover:bg-green-600 active:bg-green-700"
            : "bg-gray-400 cursor-not-allowed opacity-60"}`}
      >
        <span className="hidden md:inline">Send</span>
        <span className="md:hidden">→</span>
      </button>
    </div>
  );
}
