import { storyblokEditable } from '@storyblok/react';

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
    return (
        <footer className="bg-white shadow-md p-8">
            <div className="container mx-auto flex flex-col md:flex-row items-start justify-between gap-8 shadow-t-lg"> 
                <div className="pr-40"> 
                <h1>{blok.footerTitle}</h1>
                </div>
                <div className="flex flex-col gap-2 relative ml-12 mr-12">
                    <h1>{blok.formwrapper[0].formTitle}</h1>
                    <p>{blok.formwrapper[0].formDescription}</p>
                    <form className="border-2 border-gray-300 p-1">
                        {blok.formwrapper[0].forms.map((form: any) => (
                            <input key={form._uid} type={form.type} placeholder={form.placeholder} className="w-full focus:outline-none" />
                        ))}
                    </form>
                    <button 
                    {...storyblokEditable(blok)}
                    className="absolute top-3/4 right-0 transform -translate-y-1/2 mt-2 mr-2 px-4 py-2 text-black font-semibold transition-transform duration-300 text-sm hover:text-base"
                    onClick={(e) => {
                        e.preventDefault();
                        console.log('Button clicked!');
                        console.log('Navigation Success Button:', blok.formwrapper[0].navigationSuccessButton);
                        console.log('Navigation Success URL:', blok.formwrapper[0].navigationSuccess.cached_url);
                    }}
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