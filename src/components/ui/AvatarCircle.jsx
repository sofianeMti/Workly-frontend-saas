/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "../../lib/utils";

export const AvatarCircles = ({ numPeople, className, avatarUrls }) => {
  return (
    <div
      className={cn(
        "z-10 flex mt-8 justify-center -space-x-4 rtl:space-x-reverse",
        className
      )}
    >
      {avatarUrls.map((url, index) => (
        <a
          key={index}
          href={url.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            key={index}
            className="h-8 w-8 rounded-full border-2 border-white dark:border-gray-800"
            src={url.imageUrl}
            width={40}
            height={40}
            alt={`Avatar ${index + 1}`}
          />
        </a>
      ))}
      {(numPeople ?? 0) > 0 && (
        <a
          className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-black text-center text-[9px] font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black"
          href=""
        >
          +{numPeople}
        </a>
      )}
    </div>
  );
};
