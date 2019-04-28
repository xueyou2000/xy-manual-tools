import React from "react";
import CodeBox from "./Components/CodeBox";
import demoInfos from "./demoInfos";
import { Row, Col } from "xy-grid";
import "xy-grid/assets/index.css";
import "./app.scss";

const leftCol = demoInfos.slice(0, Math.ceil(demoInfos.length / 2));
const rightCol = demoInfos.slice(Math.ceil(demoInfos.length / 2));
const cols = [leftCol, rightCol];

console.log(demoInfos);

export default function App() {
    return (
        <div className="app">
            <Row className="code-boxes" gutter={16}>
                {cols.map((col, i) => (
                    <Col span={12} key={i}>
                        {col.map((info) => {
                            const Component = info.component;
                            return (
                                <CodeBox title={info.title} code={info.code} desc={info.desc}>
                                    <Component />
                                </CodeBox>
                            );
                        })}
                    </Col>
                ))}
            </Row>
        </div>
    );
}
