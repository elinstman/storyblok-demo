import { Link } from "react-router";
import { useState } from 'react';
import { useFetcher } from "react-router";
import { storyblokEditable } from "@storyblok/react";
import Button from "./button";

type HeroNavProps = {
    blok: {
        _uid: string;
        heroNavTitle: string;
        heroNavLinks: Array<{
            _uid: string;
            title: string;
            link: {
                cached_url: string;
            }
            nestleLinkBlock: Array<{
                _uid: string;
                title: string;
                link: {
                    cached_url: string;
                }
            }>
        }>
    };
    onCategoryChange: (category: string) => void;
}

export default function HeroNav({ blok }: HeroNavProps) {
    const fetcher = useFetcher();
    
    return (

        <button onClick={() => {
            console.log('hej');
            alert('Button clicked!');
        }}
        className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2">Test halloj</button>

        // <div className="bg-white pt-12">
        //     <div className="container mx-auto flex flex-col items-center justify-center gap-6">
        //         {/* Title section */}
        //         <div className="flex items-center">
        //             <h2 className="text-2xl font-thin">{blok.heroNavTitle}</h2>
        //         </div>
                
        //         {/* Navigation */}
        //         <nav className="w-full">
        //             <ul className="flex justify-center gap-8 flex-wrap">
        //                 {blok.heroNavLinks.map((navItem) => {
        //                     return (
        //                         <li 
        //                             key={navItem._uid}
        //                             className="relative group cursor-pointer"
        //                         >
        //                             <div className="h-full hover:text-gray-500"                               
        //                        >
        //                            <button 
        //                                className="block px-4 py-2 transition-colors text-sm z-10"
        //                                onClick={()=>{
        //                                    console.log('link clicked');
        //                                }}
        //                            >
        //                                {navItem.title}
        //                            </button>
                        
                                   
        //                        </div>
        //                         </li>
        //                     );
        //                 })}
        //             </ul>
        //         </nav>
        //     </div>
        // </div>
    );
}
