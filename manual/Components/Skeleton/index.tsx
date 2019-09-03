import React from "react";
import CodeBox from "../CodeBox";
import CodeSource from "../CodeSource";
import { markdown } from "markdown";
import Affix from "xy-affix";
import { Row, Col } from "xy-grid";
import "xy-grid/assets/index.css";
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
                <Affix className="top-affix" placement="top" offset={20}>
                    <ul className="demo-top">
                        {configs.map((cfg, i) => (
                            <li key={i} title={cfg.title}>
                                <a href={`#${process.env.componentName}-${cfg.fileName}`}>{cfg.title}</a>
                            </li>
                        ))}
                    </ul>
                </Affix>

                <div dangerouslySetInnerHTML={{ __html: markdown.toHTML(process.env.SummaryStart, "Maruku") }} />
                <CodeSource language="md" html={process.env.SummaryHeader} />

                <h2 className="title  language-md">
                    <span className="token punctuation">## </span>代码演示
                </h2>

                <Row className="code-boxes" gutter={16}>
                    {cols.map((col, i) => (
                        <Col span={24} xl={12} key={i}>
                            {col.map((info) => (
                                <CodeBox key={info.title} id={`${process.env.componentName}-${info.fileName}`} title={info.title} code={info.code} desc={info.desc}>
                                    {info.component}
                                </CodeBox>
                            ))}
                        </Col>
                    ))}
                </Row>

                <h2 className="title  language-md">
                    <span className="token punctuation">## </span>API
                </h2>
                <div dangerouslySetInnerHTML={{ __html: markdown.toHTML(process.env.SummaryAPI, "Maruku") }} />

                <CodeSource language="md" html={process.env.SummaryFooter} />
            </article>
        </div>
    );
}
