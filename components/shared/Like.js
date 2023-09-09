"use client"
import { likeThread, unlikeThread, getLikesCount } from "../../lib/actions/thread.actions"; // You might need to add a function to get the likes count
import { useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Like({
  post, // Simple value
}) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0); // Initialize likes count to 0

  const { user } = useUser();
  const pathname = usePathname();

  // Load the liked state and likes count from local storage on component mount
  useEffect(() => {
    if (user) {
      const localStorageKey = `liked-${post}-${user.id}`;
      const storedLiked = localStorage.getItem(localStorageKey);
      if (storedLiked) {
        setLiked(storedLiked === "true");
      }

      // Retrieve the likes count for the post and update the state
      getLikesCount(post).then((count) => {
        setLikesCount(count);
      });
    }
  }, [post, user]);

  const handleLike = () => {
    if (!user) {
      return; // Do nothing if user is not logged in
    }

    if (!liked) {
      likeThread(post, user.id, pathname)
        .then(() => {
          setLiked(true);
          // Update the likes count and store the liked state in local storage
          setLikesCount(likesCount + 1);
          const localStorageKey = `liked-${post}-${user.id}`;
          localStorage.setItem(localStorageKey, "true");
        })
        .catch((error) => console.error("Failed to like thread:", error));
    } else {
      unlikeThread(post, user.id, pathname)
        .then(() => {
          setLiked(false);
          // Update the likes count and remove the liked state from local storage
          setLikesCount(likesCount - 1);
          const localStorageKey = `liked-${post}-${user.id}`;
          localStorage.removeItem(localStorageKey);
        })
        .catch((error) => console.error("Failed to unlike thread:", error));
    }
  };

  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleLike();
        }}
      >
        <Heart fill={liked ? "#dc2626" : "#0a0a0a"} className="w-5 h-5" />
      </button>
      <span className="text-small-regular text-light-2">{likesCount} Likes</span>
    </div>
  );
}
