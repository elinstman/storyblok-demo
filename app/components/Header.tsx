type HeaderProps = {
    blok: {
        _uid: string;
        headerTitle: string;
        logo: {
            filename: string;
            alt: string;
        }
        headerNav: [];
    };
}

export default function Header({ blok }: HeaderProps) {

    return (
        <header className="bg-white shadow-md p-4">
            <div className="container mx-auto flex flex-col items-center justify-center gap-9"> 
                {/* image div */}
                <div className="flex items-center gap-2">
                    <img src={blok.logo.filename} alt={blok.logo.alt || "Logo"} className="h-10"
                    />
                    <span>{blok.headerTitle}</span>
                </div>
                {/* nav div */}
                <div className="w-full">
                    <ul className="flex text-black justify-center gap-12">
                        {blok.headerNav.map((navItem: any) => (
                            <li key={navItem._uid} className="hover:text-gray-500">
                                <a href={navItem.link}>{navItem.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    )
}