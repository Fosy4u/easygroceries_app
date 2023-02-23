import { lazy } from "react";
import Loadable from "../../utils/components/Loadable";

export const Auth = Loadable(lazy(() => import("./Login")));
