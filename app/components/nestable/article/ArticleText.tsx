import { storyblokEditable } from "@storyblok/react";

type ArticleTextProps = {
    blok: {
        _uid: string;
        text: {
            type: string;
            content: Array<{
                type: string;
                content: Array<{
                    text: string;
                    type: string;
                }>;
            }>;
        };
    };
}

export default function ArticleText({ blok }: ArticleTextProps) {
    return (
        <div {...storyblokEditable(blok)} key={blok._uid}>
            {blok.text.content.map((paragraph, index) => (
                <p key={index} className="mb-4">
                    {paragraph.content.map((text, textIndex) => (
                        <span key={textIndex}>
                            {text.text}
                            {text.type === "hard_break" && <br />}
                        </span>
                    ))}
                </p>
            ))}
        </div>
    );
}
