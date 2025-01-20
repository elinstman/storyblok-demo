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
        <header className="bg-white shadow-md p-4">
            <div className="container mx-auto flex flex-col items-center justify-center gap-9">
                {/* Logo section */}
                <div className="flex items-center gap-2">
                    <img src={blok.logo.filename} alt={blok.logo.alt || "Logo"} className="h-10" />
                    <span>{blok.headerTitle}</span>
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
                                    <Link 
                                        to={navItem.link.cached_url || "#"}
                                        className="block px-4 py-2 hover:text-grey-200 transition-colors"
                                    >
                                        {navItem.title}
                                    </Link>
                                    
                                    {/* Dropdown menu - using group-hover instead of state */}
                                    {navItem.nestleLinkBlock && navItem.nestleLinkBlock.length > 0 && (
                                        <ul className="invisible group-hover:visible absolute left-0 top-full mt-2 bg-gray-100 shadow-lg rounded-md py-2 min-w-[200px] z-50">
                                            {navItem.nestleLinkBlock.map((nestedItem) => (
                                                <li key={nestedItem._uid}>
                                                    <Link 
                                                        to={nestedItem.link.cached_url || "#"}
                                                        className="block px-4 py-2 hover:bg-gray-200 text-black transition-colors z-50"
                                                    >
                                                        {nestedItem.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    );
}