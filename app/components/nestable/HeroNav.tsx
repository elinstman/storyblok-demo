import { Link } from "react-router-dom";

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
}

export default function HeroNav({ blok }: HeroNavProps) {
    
    return (
        <div className="bg-white pt-12">
            <div className="container mx-auto flex flex-col items-center justify-center gap-6">
                {/* Title section */}
                <div className="flex items-center">
                    <h2 className="text-2xl font-thin">{blok.heroNavTitle}</h2>
                </div>
                
                {/* Navigation */}
                <nav className="w-full">
                    <ul className="flex justify-center gap-8 flex-wrap">
                        {blok.heroNavLinks.map((navItem) => (
                            <li 
                                key={navItem._uid}
                                className="relative group"
                            >
                                <div className="h-full hover:text-gray-500">
                                    <Link 
                                        to={navItem.link.cached_url || "#"}
                                        className="block px-4 py-2 transition-colors text-sm"
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
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}
