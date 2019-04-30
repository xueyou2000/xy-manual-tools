
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
    import Basic from 'D:\\Develop\\WebDevelop\\Repos\\react-components\\xy-button\\examples\\Basic'
configs.push({ component: <Basic />, ...(ConfigJson[0]) });
import ShapeAndIcon from 'D:\\Develop\\WebDevelop\\Repos\\react-components\\xy-button\\examples\\ShapeAndIcon'
configs.push({ component: <ShapeAndIcon />, ...(ConfigJson[1]) });
import Size from 'D:\\Develop\\WebDevelop\\Repos\\react-components\\xy-button\\examples\\Size'
configs.push({ component: <Size />, ...(ConfigJson[2]) });
import Disabled from 'D:\\Develop\\WebDevelop\\Repos\\react-components\\xy-button\\examples\\Disabled'
configs.push({ component: <Disabled />, ...(ConfigJson[3]) });
import Loading from 'D:\\Develop\\WebDevelop\\Repos\\react-components\\xy-button\\examples\\Loading'
configs.push({ component: <Loading />, ...(ConfigJson[4]) });
import Ghost from 'D:\\Develop\\WebDevelop\\Repos\\react-components\\xy-button\\examples\\Ghost'
configs.push({ component: <Ghost />, ...(ConfigJson[5]) });
import ButtonGroup from 'D:\\Develop\\WebDevelop\\Repos\\react-components\\xy-button\\examples\\ButtonGroup'
configs.push({ component: <ButtonGroup />, ...(ConfigJson[6]) });
import IconButtonGroup from 'D:\\Develop\\WebDevelop\\Repos\\react-components\\xy-button\\examples\\IconButtonGroup'
configs.push({ component: <IconButtonGroup />, ...(ConfigJson[7]) });
export default configs;