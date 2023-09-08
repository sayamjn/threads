"use client"
import { likeThread, unlikeThread } from "../../lib/actions/thread.actions";
import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Like({
  post, // Simple value
  likes = [], // Likes array (defaulted to empty array)
}) {
  const [liked, setLiked] = useState(false);

  const { user } = useUser();
  const pathname = usePathname();

  // Load the liked state from local storage on component mount
  useEffect(() => {
    const localStorageKey = `liked-${post}`;
    const storedLiked = localStorage.getItem(localStorageKey);
    if (storedLiked) {
      setLiked(storedLiked === "true");
    }
  }, [post]);

  const handleLike = () => {
    if (!user) {
      return; // Do nothing if user is not logged in
    }

    if (!liked) {
      likeThread(post, user.id, pathname)
        .then(() => {
          setLiked(true);
          // Store the liked state in local storage
          const localStorageKey = `liked-${post}`;
          localStorage.setItem(localStorageKey, "true");
        })
        .catch((error) => console.error("Failed to like thread:", error));
    } else {
      unlikeThread(post, user.id, pathname)
        .then(() => {
          setLiked(false);
          // Remove the liked state from local storage
          const localStorageKey = `liked-${post}`;
          localStorage.removeItem(localStorageKey);
        })
        .catch((error) => console.error("Failed to unlike thread:", error));
    }
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleLike();
      }}
    >
      <Heart fill={liked ? "#dc2626" : "#0a0a0a"} className="w-5 h-5" />
    </button>
  );
}
