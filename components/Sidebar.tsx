import { Button } from "@base-ui/react";
import AuthSidebar from "./authSidebar";

export default function (){
    return (
        <div className="w-64 h-screen bg-gray-800 text-white flex flex-col gap-5">
            <Button  className="w-full  h-22 bg-pink-500 hover:bg-blue-600 ">
                Instagram
            </Button>
            <div className="w-full    flex flex-col gap-10 p-2">
                <Button className="w-full  ">
                    Home
                </Button>
                <Button className="w-full  ">
                    Search
                </Button>
                <Button className="w-full  ">
                    Create
                </Button>
                <Button className="w-full  ">
                    Profile
                </Button>
                
            </div>
            <div className="w-full  mt-auto ">
                <AuthSidebar />
            </div>

        </div>
    )
}