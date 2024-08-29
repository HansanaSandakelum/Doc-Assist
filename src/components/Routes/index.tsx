import {useRoutes} from 'react-router-dom';

import UnauthorizedRoutes from './UnauthorizedRoutes';
import AdminAuthorizedRoutes from "./AdminAuthorizedRoutes";
// import {useSelector} from "react-redux";
import UserAuthorizedRoutes from "./UserAuthorizedRoutes";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    // const authState = useSelector((state: any) => state.auth.authData);
    // const user = getState(authState);
    // const user = {role: 1};
    return useRoutes( UnauthorizedRoutes);//user ? ROLES_ROUTES[user?.role] || UnauthorizedRoutes :
}

// const ROLES_ROUTES: any = {
//     0: UserAuthorizedRoutes(0),
//     1: AdminAuthorizedRoutes(1),
//     undefined: UnauthorizedRoutes
// };
