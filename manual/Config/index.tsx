
import React from 'react';
export interface DemoConfig {
    fileName?: string;
    code?: string;
    title?: string;
    desc?: string;
    component?: React.ReactNode;
}

import ConfigJson from "./Demos.json";
const configs: DemoConfig[] = [];
    import Simple from 'E:\\Develop\\WebDevelop\\Repos\\react-components\\xy-skeleton\\examples\\Simple'
configs.push({ component: <Simple />, ...(ConfigJson[0]) });
export default configs;