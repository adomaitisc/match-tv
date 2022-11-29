import React from "react";

export const NotificationItem = ({
  message,
  handleDismiss,
}: {
  message: string;
  handleDismiss: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <li className="flex text-sm w-full bg-zinc-300 backdrop-blur-sm text-black px-3 py-2 rounded-md movies-start justify-between gap-2 mb-2">
      <p className="overflow-ellipsis">{message}</p>
      <div className="flex justify-center movies-center gap-2">
        <button id={message} onClick={(e) => handleDismiss(e)}>
          Dismiss
        </button>
      </div>
    </li>
  );
};
