import {
  Heart,
  MessageCircle,
  Share,
  Bookmark,
} from "lucide-react";
export default function Feed(){
    
    const reel = {
        id: 1,
        username: "codewithaman",
        profilePic: "https://picsum.photos/80",
        description:
            "Building a YouTube Shorts clone with React and Tailwind 🚀 Follow for more web development content.",
        music: "Lo-fi Coding Beats",
        likes: 12400,
        comments: 532,
        shares: 89,
        videoUrl: "dummy-video.mp4",
        };
    return(
        <div className=" relative w-full h-full ">
            {/* content */}
            <div className="w-full  h-full">
                <img src={reel.profilePic} alt="Profile" className="w-full h-full object-cover" />
            </div>
            {/* caption */}
            <div className="absolute bottom-0 left-0 p-3 space-y-1">
                <div className="font-semibold">
                    {reel.username}
                </div>

                <div className="text-sm">
                    {reel.description}
                </div>

                <div className="text-sm text-gray-300">
                    🎵 {reel.music}
                </div>
            </div>
            {/* actions */}
            <div className="absolute top-80 right-0 p-2">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center">
                        <Heart size={28} />
                        <span className="text-sm">1.9K</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <MessageCircle size={28} />
                        <span className="text-sm">35</span>
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