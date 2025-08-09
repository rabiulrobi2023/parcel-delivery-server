import { Router } from "express";
import { UserContrlller } from "./user.controller";
import { validationRequest } from "../../middlewires/validationRequest";
import { UserValidation } from "./user.validation";
import checkAuth from "../../middlewires/checkAuth";
import { Role } from "./user.interface";

const router = Router();
router.post(
  "/register",
  validationRequest(UserValidation.createUserValidationSchema),
  UserContrlller.createUser
);
router.post(
  "/create-admin",
  checkAuth(Role.superAdmin),
  validationRequest(UserValidation.createUserValidationSchema),
  UserContrlller.createAdmin
);

router.get(
  "/",
  checkAuth(Role.superAdmin, Role.admin),
  UserContrlller.getAllusers
);

router.get(
  "/me",
  checkAuth(Role.superAdmin, Role.admin, Role.receiver, Role.sender),
  UserContrlller.getMe
);

router.get(
  "/:id",
  checkAuth(Role.sender, Role.admin),
  UserContrlller.getSingleUser
);

router.patch(
  "/block-user/:id",
  checkAuth(Role.superAdmin, Role.admin),
  UserContrlller.blockUser
);

router.patch(
  "/unblock-user/:id",
  checkAuth(Role.superAdmin, Role.admin),
  UserContrlller.unblockUser
);

router.delete(
  "/:id",
  checkAuth(Role.superAdmin, Role.admin),
  UserContrlller.deleteUser
);

export const UserRoutes = router;
