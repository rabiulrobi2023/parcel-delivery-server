import { Router } from "express";
import checkAuth from "../../middlewires/checkAuth";
import { Role } from "../user/user.interface";
import { ParcelContrller } from "./parcel.contrller";
import { validationRequest } from "../../middlewires/validationRequest";
import { ParcelValidation } from "./parcel.validation";

const router = Router();
router.post(
  "/",
  checkAuth(Role.sender),
  validationRequest(ParcelValidation.createParcelValidationSchema),
  ParcelContrller.createParcel
);

router.get("/", checkAuth(Role.admin), ParcelContrller.getAllParcel);
router.patch(
  "/cancel/:id",
  checkAuth(Role.sender),
  ParcelContrller.cancelParcel
);

router.get("/mine", checkAuth(Role.sender),ParcelContrller.getMysentParcels )

export const ParcelRoutes = router;
