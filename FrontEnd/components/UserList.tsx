interface UserListProps {
  users: any[];
  activeUser: any;
  onSelect: (user: any) => void;
}

// export default function UserList({ users, activeUser, onSelect }: UserListProps) {
//   return (
//     <div className="w-72 bg-green-500 border-r flex flex-col">
//       <div className="p-4 font-bold border-b">Users</div>
//       <div className="flex-1 overflow-y-auto">
//         {users.map(u => (
//           <div
//             key={u._id}
//             onClick={() => onSelect(u)}
//             className={`px-4 py-3 cursor-pointer hover:bg-black-100 rounded-lg m-1
//               ${activeUser?._id === u._id ? "bg-blue-100" : ""}`}
//           >
//             {u.name}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

export default function UserList({ users, activeUser, onSelect }: UserListProps) {
  return (
    <div className="w-72 bg-green-500 border-r flex flex-col">
      <div className="p-4 font-bold border-b text-white">Users</div>
      <div className="flex-1 overflow-y-auto">
        {users.map(u => {
          const isActive = activeUser?._id === u._id;
          return (
            <div
              key={u._id}
              onClick={() => onSelect(u)}
              className={`px-4 py-3 cursor-pointer rounded-lg m-1
                ${isActive ? "bg-blue-100 text-black" : "text-white hover:text-black hover:bg-black-100"}`}
            >
              {u.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

