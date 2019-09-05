import { RouteConfig } from "react-router-config";
import Menus from "../menus";

const routes: RouteConfig[] = [
    {
        path: "/",
        exact: true,
        component: Menus,
    },
];

export default routes;
