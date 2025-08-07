import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoute } from "../modules/auth/auth.route";
import { ParcelRoutes } from "../modules/parcel/parcel.route";

export const router = Router();

interface IModuleRoutes {
  path: string;
  route: Router;
}

const moduleRoutes: IModuleRoutes[] = [
  { path: "/user", route: UserRoutes },
  { path: "/auth", route: AuthRoute },
  { path: "/parcels", route: ParcelRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
