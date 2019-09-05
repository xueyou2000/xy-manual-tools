import React from "react";
export interface DemoConfig {
    fileName?: string;
    code?: string;
    title?: string;
    desc?: string;
    component?: React.ReactNode;
}

import ConfigJson from "./Demos.json";
const configs: DemoConfig[] = [];
export default configs;
