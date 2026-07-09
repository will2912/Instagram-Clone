"use client";
import MusicPannel from "@/components/musicPannel";
import {Input} from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function UploadPage() {

    const [file, setFile] = useState<File | null>(null);
    const [caption, setCaption] = useState<string>("");
    const [musicFile, setMusicFile] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [musicValue, setMusicValue] = useState("search music");


    useEffect(() => {
        if (musicFile) {
            setMusicValue(`♪ ${musicFile.artist} - ${musicFile.title}`);
        }

    }, [musicFile]);



    return(
        <div className="relative flex justify-center items-center h-full w-full ">
            <div className=" w-96 h-96 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center gap-4">
                <Input placeholder="Upload Image" type="file" onChange={(e) => setFile(e.target.files?.[0] || null) } />
                <Input placeholder="Caption" type="text" value={caption} onChange={(e) => setCaption(e.target.value)} />
                <div className="w-full items-center p-2 border border-gray-300 rounded-lg"  onClick={() => setIsOpen(!isOpen)} >
                    <p> {musicValue}</p>
                </div>
                
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    Upload
                </button>

            </div>
            <div className="w-100px h-full  " >
                    <MusicPannel  setMusicFile={setMusicFile} isOpen={isOpen} setIsOpen={setIsOpen} setMusicValue={setMusicValue} />                   
            </div>
           
        </div>
    )
}
