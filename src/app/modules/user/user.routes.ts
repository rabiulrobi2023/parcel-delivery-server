import { Router } from "express";
import { UserContrlller } from "./user.controller";
import { validationRequest } from "../../middlewires/validationRequest";
import { UserValidation } from "./user.validation";

const router = Router();
router.use(
  "/create",
  validationRequest(UserValidation.createUserValidationSchema),
  UserContrlller.createUser
);

export const UserRoutes = router;
