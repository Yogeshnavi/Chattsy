interface UserListProps {
  users: any[];
  activeUser: any;
  onSelect: (user: any) => void;
}

export default function UserList({ users, activeUser, onSelect }: UserListProps) {
  return (
    <div className="w-full md:w-72 bg-green-500 border-r border-green-600 flex flex-col h-full">
      {/* Header */}
      <div className="p-3 md:p-4 font-bold border-b border-green-600 text-white bg-green-600">
        <h2 className="text-lg md:text-xl">Users</h2>
        <p className="text-xs text-green-100 mt-1">{users.length} online</p>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {users.length === 0 ? (
          <div className="flex items-center justify-center h-full text-white text-center p-4">
            No users available
          </div>
        ) : (
          users.map(u => {
            const isActive = activeUser?._id === u._id;
            return (
              <div
                key={u._id}
                onClick={() => onSelect(u)}
                className={`px-3 md:px-4 py-3 md:py-4 cursor-pointer rounded-lg m-2 transition-all duration-200 touch-manipulation
                  ${isActive 
                    ? "bg-blue-600 text-white shadow-lg scale-95" 
                    : "text-white hover:bg-green-400 active:bg-green-400"}`}
              >
                <div className="font-semibold text-sm md:text-base">{u.name}</div>
                <div className="text-xs text-opacity-75 text-white mt-1">Click to chat</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

