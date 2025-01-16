type FooterProps = {
    blok: {
        _uid: string;
        footerTitle: string;
        footerNavTitle: string;
        footerNav: []; 
        formwrapper: [{
            forms: [{
                name: string;
                type: string;
                placeholder: string;
            }];
            formTitle: string;
            formDescription: string;
            navigationSuccessButton: string;
            navigationSuccess: {
                id: string;
                cached_url: string;
            };
        }]
       
    };
}

export default function Footer({ blok }: FooterProps) {
    console.log("blok in footer", blok);
    return (
        <footer className="bg-white shadow-md p-8">
            <div className="container mx-auto flex flex-col md:flex-row items-start justify-between gap-8 shadow-t-lg"> 
                <div> 
                <h1>{blok.footerTitle}</h1>
                </div>
                <div className="flex flex-col gap-2 relative">
                    <h1>{blok.formwrapper[0].formTitle}</h1>
                    <p>{blok.formwrapper[0].formDescription}</p>
                    <form className="border-2 border-gray-300 p-1">
                        {blok.formwrapper[0].forms.map((form: any) => (
                            <input type={form.type} placeholder={form.placeholder} />
                        ))}
                    </form>
                    <button 
                    className="absolute top-3/4 right-0 transform -translate-y-1/2 mt-2 mr-2 px-4 py-2 text-black font-semibold transition-transform duration-300 text-sm hover:text-base"
                    > {blok.formwrapper[0].navigationSuccessButton}</button>
                </div>
                {/* footer nav div */}
            <div>
                <ul>
                    <span>{blok.footerNavTitle}</span>
                    {blok.footerNav.map((navItem: any) => (
                        <li key={navItem._uid} className="hover:text-gray-500">
                            <a href={navItem.link}>{navItem.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
            </div>
           
        </footer>
    )
}