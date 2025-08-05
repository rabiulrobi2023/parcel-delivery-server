import { Router } from "express";
import { AuthContrller } from "./auth.controller";

const router = Router();

router.post("/login", AuthContrller.credentialLogin);
export const AuthRoute = router;
