interface MessageInputProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
}

export default function MessageInput({ value, onChange, onSend }: MessageInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSend();
  };

  return (
    <div className="p-4 bg-black-700 border-t flex gap-2">
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-green-400 text-black"
      />
      <button
        onClick={onSend}
        disabled={!value.trim()}
        className={`px-4 py-2 rounded-full text-white
          ${value.trim()
            ? "bg-green-500 hover:bg-green-600"
            : "bg-gray-400 cursor-not-allowed"}`}
      >
        Send
      </button>
    </div>
  );
}
