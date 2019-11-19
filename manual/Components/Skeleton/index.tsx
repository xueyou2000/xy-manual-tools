import React from "react";
import CodeBox from "../CodeBox";
import CodeSource from "../CodeSource";
import { markdown } from "markdown";
import configs from "../../Config";
import "./index.scss";

const cols = [[], []];
configs.forEach((config, i) => {
    const index = i % 2;
    cols[index].push(config);
});

export default function App() {
    return (
        <div className="xy-manual-container">
            <article>
                <ul className="top-affix demo-top">
                    {configs.map((cfg, i) => (
                        <li key={i} title={cfg.title}>
                            <a href={`#${process.env.componentName}-${cfg.fileName}`}>{cfg.title}</a>
                        </li>
                    ))}
                </ul>

                <div dangerouslySetInnerHTML={{ __html: markdown.toHTML(process.env.SummaryStart, "Maruku") }} />
                <CodeSource language="md" html={process.env.SummaryHeader} />

                <h2 className="title  language-md">
                    <span className="token punctuation">## </span>代码演示
                </h2>

                <div className="code-boxes">
                    {cols.map((col, i) => (
                        <span className="code-boxes-col" key={i}>
                            {col.map((info) => (
                                <CodeBox key={info.title} id={`${process.env.componentName}-${info.fileName}`} title={info.title} code={info.code} desc={info.desc}>
                                    {info.component}
                                </CodeBox>
                            ))}
                        </span>
                    ))}
                </div>

                <h2 className="title  language-md">
                    <span className="token punctuation">## </span>API
                </h2>
                <div dangerouslySetInnerHTML={{ __html: markdown.toHTML(process.env.SummaryAPI, "Maruku") }} />

                <CodeSource language="md" html={process.env.SummaryFooter} />
            </article>
        </div>
    );
}
