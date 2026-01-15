interface MessageProps {
  message: any;
  currentUserId: string;
}

export default function Message({ message, currentUserId }: MessageProps) {
  const isMe = message.sender._id === currentUserId;

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg break-words text-sm
          ${isMe
            ? "bg-green-500 text-white rounded-br-none"
            : "bg-white text-gray-800 rounded-bl-none shadow"}
        `}
      >
        <div>{message.content}</div>
        {message.createdAt && (
          <div className="text-[10px] text-black-400 mt-1 text-right">
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
