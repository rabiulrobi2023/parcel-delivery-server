import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";

export const router = Router();

interface IModuleRoutes {
  path: string;
  route: Router;
}

const moduleRoutes: IModuleRoutes[] = [{ path: "/user", route: UserRoutes }];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
