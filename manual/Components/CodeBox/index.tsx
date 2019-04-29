import React, { useState } from "react";
import classNames from "classnames";
import CodeSource from "../CodeSource";
import Divider from "xy-divider";
import "xy-divider/assets/index.css";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";

import { MessageBox } from "xy-messagebox";
import "xy-messagebox/assets/index.css";

export interface CodeBoxProps {
    /**
     * 附加类名
     */
    prefixCls?: string;
    /**
     * 根节点的附加类名
     */
    className?: string;
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
    /**
     * ID
     */
    id?: string;
    /**
     * demo代码
     */
    code: string;
    /**
     * 标题
     */
    title?: string;
    /**
     * 说明
     */
    desc?: string;
    /**
     * demo例子
     */
    children?: React.ReactNode;
}

export default function CodeBox(props: CodeBoxProps) {
    const { prefixCls = "code-box", className, style, id, code, title, desc, children } = props;
    const [visible, setVisibel] = useState(false);
    const classString = classNames(prefixCls, className, {
        [`${prefixCls}-visible`]: visible
    });

    function toggleVisible() {
        setVisibel((pre) => !pre);
    }

    const example = (
        <section className={classString} style={style} id={id}>
            <div className={`${prefixCls}-left`}>
                <section className={`${prefixCls}-demo`}>{children}</section>
                <section className={`${prefixCls}-mate`}>
                    <Divider orientation="left">{title}</Divider>
                    <div className={`${prefixCls}-description`}>{desc}</div>
                </section>
            </div>
            <section className={`${prefixCls}-code-wrapper`}>
                <CodeSource html={code} />
            </section>
            <div className={`${prefixCls}-actions`}>
                <i className={`${prefixCls}-actions__icon`} onClick={toggleVisible}>
                    <FontAwesomeIcon icon={faExpand} />
                </i>
            </div>
        </section>
    );

    return (
        <React.Fragment>
            {example}
            <MessageBox visible={visible} onChange={setVisibel}>
                <div style={{ minWidth: "750px", width: "auto" }}>{example}</div>
            </MessageBox>
        </React.Fragment>
    );
}
