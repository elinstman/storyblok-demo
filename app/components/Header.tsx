import { useState } from "react";
import { Link } from "react-router-dom";

type HeaderProps = {
    blok: {
        _uid: string;
        headerTitle: string;
        logo: {
            filename: string;
            alt: string;
        }
        headerNav: Array<{
            index: number;
            _uid: string;
            title: string;
            link: {
                title: string;
                cached_url: string;
            }
            nestleLinkBlock?: Array<{
                index: number;
                _uid: string;
                title: string;
                link: {
                    title: string;
                    cached_url: string; 
                }
            }>
        }>
    };
}

export default function Header({ blok }: HeaderProps) {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const handleMouseEnter = (uid: string) => {
        console.log('Mouse enter:', uid);
        setHoveredItem(uid);
    };

    const handleMouseLeave = () => {
        console.log('Mouse leave, current hovered:', hoveredItem);
        setHoveredItem(null);
    };

    return (
        <header className="bg-white shadow-md p-4 relative z-50">
            <div className="container mx-auto flex flex-col items-center justify-center gap-9">
                {/* Logo section */}
                <div className="flex items-center gap-2">
                    <Link to="/">
                        <div className="flex items-center gap-2">
                            <img src={blok.logo.filename} alt={blok.logo.alt || "Logo"} className="h-10" />
                            <span>{blok.headerTitle}</span>
                        </div>
                    </Link>
                    
                </div>
                
                {/* Navigation */}
                <nav className="w-full">
                    <ul className="flex justify-center gap-8">
                        {blok.headerNav.map((navItem) => {
                            return (
                                <li 
                                    key={navItem._uid}
                                    className="relative group"
                                >
                                    <div className="h-full hover:text-gray-500">
                                        <Link 
                                            to={navItem.link.cached_url || "#"}
                                            className="block px-4 py-2 transition-colors"
                                        >
                                            {navItem.title}
                                        </Link>
                                        
                                        {navItem.nestleLinkBlock && navItem.nestleLinkBlock.length > 0 && (
                                            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-0 top-full pt-2 transition-all duration-500">
                                                <ul className="bg-white shadow-lg rounded-md py-2 min-w-[200px]">
                                                    {navItem.nestleLinkBlock.map((nestedItem) => (
                                                        <li key={nestedItem._uid}>
                                                            <Link 
                                                                to={nestedItem.link.cached_url || "#"}
                                                                className="block px-4 py-2 hover:text-gray-500 text-black transition-colors"
                                                            >
                                                                {nestedItem.title}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    );
}