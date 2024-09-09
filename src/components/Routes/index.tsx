import { useRoutes } from "react-router-dom";

import UnauthorizedRoutes from "./UnauthorizedRoutes";
import AdminAuthorizedRoutes from "./AdminAuthorizedRoutes";
// import {useSelector} from "react-redux";
import UserAuthorizedRoutes from "./UserAuthorizedRoutes";
import { useSelector } from "react-redux";
import { getState } from "../../redux/actions/actions";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const authState = useSelector((state: any) => state.auth.authData);
  // console.log('data:',authState);

  const user = getState(authState);

  console.log("user:", user);
  //   const user = { role: 0 };

  const ROLES_ROUTES: any = {
    1: AdminAuthorizedRoutes(1),
    0: UserAuthorizedRoutes(0),
    undefined: UnauthorizedRoutes(user),
  };

  return useRoutes(
    user
      ? ROLES_ROUTES[Number(user?.role)] || UnauthorizedRoutes(user)
      : UnauthorizedRoutes(user)
  );
}
