import React from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-tsx";
import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace";

interface CodeSourceProps {
    /**
     * 代码内容
     */
    html: string;
    /**
     * 代码语言
     */
    language?: "javascript" | "jsx" | "tsx";
}

/**
 * 高亮显示源码
 * @param props
 */
export default function CodeSource(props: CodeSourceProps) {
    const { language = "tsx" } = props;
    const html = Prism.highlight(props.html, Prism.languages[language], language);

    return (
        <pre className={`language-${language}`}>
            <code dangerouslySetInnerHTML={{ __html: html }} />
        </pre>
    );
}
