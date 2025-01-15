import Header from "../components/Header";
import Footer from "../components/Footer";
import type { ReactNode } from "react";
import type { ISbStoryData } from "@storyblok/react";

type LayoutProps = {
    children: ReactNode;
    config: ISbStoryData['content'] & {
        logo: any;
        header: any[];
        footer: any[];
        logoNav: any[];
        headerNav: any[];
    }
}

export default function ConfigLayout({ children, config }: LayoutProps) {
    return (
        <>
            <Header blok={config} />
            <main>{children}</main>
            <Footer blok={config} />
        </>
    )
}