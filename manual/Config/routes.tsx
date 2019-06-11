
    import { RouteConfig } from "react-router-config";
    import Menus from '../menus';
    import Basic from 'E:\\Develop\\WebDevelop\\Repos\\react-components\\xy-button\\examples\\Basic'
import ShapeAndIcon from 'E:\\Develop\\WebDevelop\\Repos\\react-components\\xy-button\\examples\\ShapeAndIcon'
import Size from 'E:\\Develop\\WebDevelop\\Repos\\react-components\\xy-button\\examples\\Size'
import Disabled from 'E:\\Develop\\WebDevelop\\Repos\\react-components\\xy-button\\examples\\Disabled'
import Loading from 'E:\\Develop\\WebDevelop\\Repos\\react-components\\xy-button\\examples\\Loading'
import Ghost from 'E:\\Develop\\WebDevelop\\Repos\\react-components\\xy-button\\examples\\Ghost'
import ButtonGroup from 'E:\\Develop\\WebDevelop\\Repos\\react-components\\xy-button\\examples\\ButtonGroup'
import IconButtonGroup from 'E:\\Develop\\WebDevelop\\Repos\\react-components\\xy-button\\examples\\IconButtonGroup'

    
    const routes: RouteConfig[] = [
        {
            path: "/",
            exact: true,
            component: Menus,
        },
        { path: "/basic", component: Basic },
{ path: "/shapeAndIcon", component: ShapeAndIcon },
{ path: "/size", component: Size },
{ path: "/disabled", component: Disabled },
{ path: "/loading", component: Loading },
{ path: "/ghost", component: Ghost },
{ path: "/buttonGroup", component: ButtonGroup },
{ path: "/iconButtonGroup", component: IconButtonGroup },

    ];
    
    export default routes;
    