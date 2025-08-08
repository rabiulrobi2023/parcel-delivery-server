import { Router } from "express";
import checkAuth from "../../middlewires/checkAuth";
import { Role } from "../user/user.interface";
import { ParcelContrller } from "./parcel.contrller";
import { validationRequest } from "../../middlewires/validationRequest";
import { ParcelValidation } from "./parcel.validation";
;

const router = Router();
router.post(
  "/",
  checkAuth(Role.sender),
  validationRequest(ParcelValidation.createParcelValidationSchema),
  ParcelContrller.createParcel
);

router.get("/", checkAuth(Role.admin), ParcelContrller.getAllParcel);

router.get("/mine", checkAuth(Role.sender), ParcelContrller.getMysentParcels);
router.get(
  "/incoming",
  checkAuth(Role.receiver),
  ParcelContrller.getMyIncomingParcels
);
router.patch(
  "/cancel/:id",
  checkAuth(Role.sender),
  ParcelContrller.cancelParcel
);

router.patch(
  "/status/:id",
  checkAuth(Role.admin),
  validationRequest(ParcelValidation.updateParcelStatusValidation),
  ParcelContrller.updateParcelStatus
);

router.patch(
  "/confirm/:id",
  checkAuth(Role.receiver),
  validationRequest(ParcelValidation.confirmDelivaryValidation),
  ParcelContrller.makeConfirmDelivery
);

export const ParcelRoutes = router;
