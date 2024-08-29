import {Navigate} from "react-router-dom";
import MainLayout from "../MainLayout";
import Loadable from "./RouteLoad/Loadable";
import {lazy} from "react";

const Dashboard = Loadable(lazy(() => import('../UserDashboard')));
const UnauthorizedAccess = Loadable(lazy(() => import('../../utils/ui-components/UnauthorizedAccess')));

function UserAuthorizedRoutes(role: any) {
    return [
        {
            path: "/",
            element: <MainLayout role={role}/>,
            children: [
                {
                    path: 'dashboard',
                    element: <Dashboard/>
                },
            ]
        },
        {
            path: 'unauthorized',
            element: <UnauthorizedAccess/>
        },
        {
            path: '',
            element: <Navigate to="/dashboard"/>
        },
        {
            path: 'login',
            element: <Navigate to="/dashboard"/>
        },
        {
            path: "*",
            element: <Navigate to="/unauthorized"/>
        },
    ];
}

export default UserAuthorizedRoutes;