interface MessageProps {
  message: any;
  currentUserId: string;
}

export default function Message({ message, currentUserId }: MessageProps) {
  const isMe = message.sender._id === currentUserId;

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-1`}>
      <div
        className={`max-w-xs md:max-w-sm px-3 md:px-4 py-2 rounded-lg break-words text-xs md:text-sm
          ${isMe
            ? "bg-green-500 text-white rounded-br-none shadow-md"
            : "bg-white text-gray-800 rounded-bl-none shadow border border-gray-200"}
        `}
      >
        <div className="leading-tight">{message.content}</div>
        {message.createdAt && (
          <div className={`text-[9px] md:text-[10px] mt-1 text-right opacity-70
            ${isMe ? "text-green-100" : "text-gray-500"}`}
          >
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        )}
      </div>
    </div>
  );
}
