import {Navigate} from "react-router-dom";
import MainLayout from "../MainLayout";
import Loadable from "./RouteLoad/Loadable";
import {lazy} from "react";

const Dashboard = Loadable(lazy(() => import('../Dashboard/new-dashboard/index')));
const Configurations = Loadable(lazy(() => import('../Configurations')));
const UserList = Loadable(lazy(() => import('../Users/user-list')))
const UserView = Loadable(lazy(() => import('../Users/view-user')));
const CampaignListReport = Loadable(lazy(() => import('../Reports/campaign-list-report')));
const UnauthorizedAccess = Loadable(lazy(() => import('../../utils/ui-components/UnauthorizedAccess')));

function AdminAuthorizedRoutes(role: any) {
    return [
        {
            path: "/",
            element: <MainLayout role={role}/>,
            children: [
                {
                    path: 'dashboard',
                    element: <Dashboard/>
                },
                {
                    path: 'user',
                    children: [
                        {
                            path: 'list',
                            element: <UserList/>
                        },
                        {
                            path: 'view/:id',
                            element: <UserView/>
                        },
                    ]
                },
                {
                    path: 'reports',
                    children: [
                        {
                            path: 'campaign-list',
                            element: <CampaignListReport/>
                        },
                    ]
                },
                {
                    path: 'settings',
                    element: <Configurations/>
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

export default AdminAuthorizedRoutes;