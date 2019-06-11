
    import React from "react";
    import { Link } from "react-router-dom";
    
    export default function Menus() {
        return (
            <ul className="manual-menus"><li><Link to="/basic">按钮类型</Link></li>
<li><Link to="/shapeAndIcon">按钮形状和图标</Link></li>
<li><Link to="/size">按钮尺寸</Link></li>
<li><Link to="/disabled">禁用状态</Link></li>
<li><Link to="/loading">加载中状态</Link></li>
<li><Link to="/ghost">幽灵按钮</Link></li>
<li><Link to="/buttonGroup">按钮组</Link></li>
<li><Link to="/iconButtonGroup">图标按钮组</Link></li>
</ul>
        );
    }
    