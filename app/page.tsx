import Feed from "@/components/Feed";
import { Button } from "@/components/ui/button";
import {
  ChevronUp,
  ChevronDown,
} from "lucide-react";

export default function Home(){

    return (
        <div className="relative flex justify-center w-full h-screen ">
            <div className=" w-[400px] aspect-[9/16] m-4 border rounded-[20px] overflow-hidden ">
                <Feed />
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