import {
  Heart,
  MessageCircle,
  Share,
  Bookmark,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Feed({ post , isActive, handleCommentClick,  }: any) {
    const user = post.users;
    const audioRef = useRef<HTMLAudioElement>(null);
    const { user: currentUser } = useUser();
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likes.length);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    
    



const [dbUser, setDbUser] = useState(null);




useEffect(() => {
  if (!user) return;

  async function getMe() {
    const res = await fetch("/api/me");
    const data = await res.json();
    
    setDbUser(data);
    setIsLiked(post.likes.some(like => like.user_id === data.id));
  }

  getMe();
}, [user]);



    useEffect(() => {
        console.log("useEffect is clicked")
  if (!audioRef.current) return;

  if (isActive) {
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  } else {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }
}, [isActive]);

useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  if (isActive) {
    video.play().catch(() => {});
  } else {
    video.pause();
    video.currentTime = 0;
  }
}, [isActive]);

const handleAudioPlay = () => {
    console.log("handleAudioPlay called");
    if (!audioRef.current) return;

  if (audioRef.current.paused) {
    audioRef.current.play().catch(() => {});
  } else {
    audioRef.current.pause();
  }
}



const handleLike=async()=>{
    fetch("/api/like",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            post_id:post.id,
            user_id:dbUser?.id
        })
    })
    
    setLikesCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);
    setIsLiked(!isLiked);
    
}

const handleVideoClick = ()=>{
    setIsMuted((prev) => !prev);
    // const video = videoRef.current;
    // if (!video) return;
    // setIsMuted(!isMuted);
    // if (video.paused) {
    //     video.play().catch(() => {});
    // } else {
    //     video.pause();
    // }
}
    
    return(
        <div className="relative w-full h-full rounded-[20px] overflow-hidden">
            {/* content */}
            <div className="w-full  h-full">
                {post.file_type?.startsWith("image") ? (
    <img
      src={post.post_url}
      alt="Post"
      className="w-full h-full object-contain"
    />
  ) : (
    <video
        onClick={handleVideoClick}
      ref={videoRef}
      src={post.post_url}
      className="w-full h-full object-contain"
      
      muted={isMuted}
      loop
      playsInline
    />
  )}
            </div>
            {/* caption */}
            <div className="absolute bottom-0 left-0 p-3 space-y-1 w-full">
                <div className="font-semibold flex items-center gap-2">
                    
                    <img
                        src={user?.avatar_url || "/default-avatar.png"}
                        alt={user?.username || "User"}
                        className="h-10 w-10 rounded-full border border-white/40 object-cover"
                    />
                    <p>{post.users?.username}</p>
                </div>

                <div className="text-sm">
                    {post.caption}
                </div>

                <div className="mt-3 w-full flex justify-between items-center gap-2 text-xs text-white/85 ">
                    
                    <p className="truncate">
                        <span>♪  </span>
                        {post.music_title
                        ? `${post.music_artist} - ${post.music_title}`
                        : "Original audio"}
                    </p>
                    <div className="relative h-12 w-12 rounded-full border border-white/30 bg-black/60 " onClick={handleAudioPlay}>
                        <div className="h-full w-full  overflow-hidden rounded-full">
                            <img 
                                src={post.music_cover_url|| user?.avatar_url || "/default-avatar.png"}
                                alt="music disc"
                                className="h-full w-full object-cover"
                            />
                            {post.music_audio_url && (
                                <audio ref={audioRef} src={post.music_audio_url} loop />
                            )}
                            
                        </div> 
                        
                    </div>
                </div>
            </div>
            {/* actions */}

            
            <div className="absolute top-80 right-0 p-2">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center">
                        <Heart size={28} onClick={handleLike} className={
                            isLiked
                                ? "fill-red-500 text-red-500"
                                : ""
                            }/>
                        <span className="text-sm">{likesCount}</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <MessageCircle size={28} onClick={() => {
                            handleCommentClick();
                            
                        }} />
                        <span className="text-sm">{post.comments_count}</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <Share size={28} />
                        <span className="text-sm">Share</span>
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}