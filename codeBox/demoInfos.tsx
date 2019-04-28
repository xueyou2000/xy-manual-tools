
import { DemoInfo } from "./interface";
import demoContentMap from "./demoContentMap.json";
const demoInfos: DemoInfo[] = [];
    import Basic from 'E:/Develop/WebDevelop/Repos/react-components/xy-button/examples/Basic'
demoInfos.push({ component: Basic, ...demoContentMap['Basic'] });
import ButtonGroup from 'E:/Develop/WebDevelop/Repos/react-components/xy-button/examples/ButtonGroup'
demoInfos.push({ component: ButtonGroup, ...demoContentMap['ButtonGroup'] });
import Disabled from 'E:/Develop/WebDevelop/Repos/react-components/xy-button/examples/Disabled'
demoInfos.push({ component: Disabled, ...demoContentMap['Disabled'] });
import Ghost from 'E:/Develop/WebDevelop/Repos/react-components/xy-button/examples/Ghost'
demoInfos.push({ component: Ghost, ...demoContentMap['Ghost'] });
import Loading from 'E:/Develop/WebDevelop/Repos/react-components/xy-button/examples/Loading'
demoInfos.push({ component: Loading, ...demoContentMap['Loading'] });
import ShapeAndIcon from 'E:/Develop/WebDevelop/Repos/react-components/xy-button/examples/ShapeAndIcon'
demoInfos.push({ component: ShapeAndIcon, ...demoContentMap['ShapeAndIcon'] });
import Size from 'E:/Develop/WebDevelop/Repos/react-components/xy-button/examples/Size'
demoInfos.push({ component: Size, ...demoContentMap['Size'] });
export default demoInfos;