"use client"

import MemoryBoard from "@/components/MemoryBoard";
import { useState } from "react";


const MemoryPage = () => {
    
    return (
        <div className=" flex flex-col w-full items-center p-4">            
            <MemoryBoard />
        </div>
    )
}

export default MemoryPage;