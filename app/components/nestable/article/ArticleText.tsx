import { storyblokEditable } from "@storyblok/react";

type TextContent = {
    text: string;
    type: string;
    marks?: Array<{ type: string }>;
}

type ArticleTextProps = {
    blok: {
        _uid: string;
        text: {
            type: string;
            content: Array<{
                type: string;
                content?: Array<TextContent>;
            }>;
        };
    };
}

export default function ArticleText({ blok }: ArticleTextProps) {
    const renderText = (text: TextContent) => {
        if (!text.marks) return text.text;
        
        return text.marks.reduce((content, mark) => {
            switch (mark.type) {
                case 'italic':
                    return <em key={mark.type}>{content}</em>;
                default:
                    return content;
            }
        }, text.text as React.ReactNode);
    };

    return (
        <div {...storyblokEditable(blok)} key={blok._uid}>
            {blok.text.content.map((paragraph, index) => (
                <p key={index} className="mb-4">
                    {paragraph.content?.map((text, textIndex) => (
                        <span key={textIndex}>
                            {renderText(text)}
                            {text.type === "hard_break" && <br />}
                        </span>
                    ))}
                </p>
            ))}
        </div>
    );
}
