import FriendRequests from "./FriendRequests";

export function NotificationsDropdown() {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-indigo-950 rounded-lg shadow-lg p-4 border border-purple-500/20">
      <FriendRequests />
    </div>
  );
} 