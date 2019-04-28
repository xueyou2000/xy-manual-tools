import React from "react";
import classNames from "classnames";
import { useMount } from "utils-hooks";
import Divider from "xy-divider";
import "xy-divider/assets/index.css";
import "./index.scss";

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
    const { prefixCls = "code-box", className, style, code, title, desc, children } = props;

    return (
        <section className={classNames(prefixCls, className)} style={style}>
            <section className={`${prefixCls}-demo`}>{children}</section>
            <section className={`${prefixCls}-mate`}>
                <Divider orientation="left">{title}</Divider>
                <div className={`${prefixCls}-description`}>{desc}</div>
            </section>
        </section>
    );
}
