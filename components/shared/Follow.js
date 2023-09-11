"use client"
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { followUser, unfollowUser } from "../../lib/actions/user.actions";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";

export default function Follow({ authUserId, accountId, initialIsFollowing }) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isPending, setIsPending] = useState(false);

  const handleFollowClick = async () => {
    try {
      setIsPending(true); // Set loading state

      if (isFollowing) {
        // If already following, unfollow
        await unfollowUser(authUserId, accountId);
        setIsFollowing(false); // Update state immediately
        // Update localStorage
        localStorage.setItem(`isFollowing_${authUserId}_${accountId}`, "false");
      } else {
        // If not following, follow
        await followUser(authUserId, accountId);
        setIsFollowing(true); // Update state immediately
        // Update localStorage
        localStorage.setItem(`isFollowing_${authUserId}_${accountId}`, "true");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsPending(false); // Reset loading state
    }
  };

  // Retrieve isFollowing state from localStorage on component initialization
  useEffect(() => {
    const storedIsFollowing = localStorage.getItem(`isFollowing_${authUserId}_${accountId}`);
    if (storedIsFollowing) {
      setIsFollowing(storedIsFollowing === "true");
    }
  }, [authUserId, accountId]);

  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        handleFollowClick();
      }}
      className="w-full"
      variant="outline"
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="animate-spin w-4 h-4" />
      ) : isFollowing ? (
        "Unfollow"
      ) : (
        "Follow"
      )}
    </Button>
  );
}
