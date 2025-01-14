import { storyblokEditable } from "@storyblok/react";

type FeatureProps = {
    blok: {
        _uid: string;
        name: string;
    }
}

export default function Feature({ blok }: FeatureProps) {

    return (
        <div {...storyblokEditable(blok)} key={blok._uid} className="w-full p-12 bg-[#f7f6fd] rounded-[5px] text-center">
        <h3 className="text-2xl text-[#1d243d] font-bold"> {blok.name} </h3>
      </div>
)
}
