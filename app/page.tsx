 "use client"
import Feed from "@/components/Feed";
import { Button } from "@/components/ui/button";
import {
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useEffect,useState,useRef } from "react";




export default function Home(){
    const [posts, setPosts] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

const handleScroll = () => {
  const container = containerRef.current;
  if (!container) return;

  const index = Math.round(
    container.scrollTop / container.clientHeight
  );

  setActiveIndex(index);
};

    useEffect(() => {
  async function fetchPosts() {
    const res = await fetch("/api/reels")
    const posts = await res.json()
    console.log(posts)
    setPosts(posts)
  }

  fetchPosts()
}, [])



    return (
        <div className="relative flex justify-center w-full h-screen ">
            <div 
            ref={containerRef}
            onScroll={handleScroll}
            className=" h-screen w-full max-w-[390px] overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar   ">
            {
                posts.map((post, index) => (
                    
                    <div
                        key={post.id}
                        className="h-screen snap-start flex items-center py-4"
                    >
                        <Feed post={post}  isActive={activeIndex === index} />
                    </div>
                                ))
            }
                
            </div>

            <div className="absolute right-0 top-0 h-screen  flex flex-col items-center justify-center w-40 gap-14">
                <div>
                    <Button variant="ghost" className="w-10 h-10 rounded-full">
                        <ChevronUp size={28} />
                    </Button>
                </div>
                <div>
                    <Button variant="ghost" className="w-10 h-10 rounded-full">
                        <ChevronDown size={28} />
                    </Button>
                </div>
            </div>
            
        </div>
    )
}