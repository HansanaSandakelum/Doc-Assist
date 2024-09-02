import {lazy} from 'react';

// project imports
import Loadable from "./RouteLoad/Loadable";
import {Navigate} from "react-router-dom";
import MinimalLayout from "../MinimalLayout";

const Login = Loadable(lazy(() => import('../Authentication/authentication/login-new')));
const SignUp = Loadable(lazy(() => import('../Authentication/authentication/register')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const UnauthorizedRoutes =
    [
        {
            path: '/',
            element: <MinimalLayout/>,
            children: [
                {
                    path: '/',
                    element: <Login/>
                },
                {
                    path: 'login',
                    element: <Login/>
                },
                {
                    path: 'signup',
                    element: <SignUp/>
                }
            ]
        },
        {
            path: "*",
            element: <Navigate to="/login"/>
        }
    ];

export default UnauthorizedRoutes;
