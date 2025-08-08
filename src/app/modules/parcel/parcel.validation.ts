import z from "zod";
import { Status, Type } from "./parcel.interface";

const createParcelValidationSchema = z.object({
  receiver: z.string(),
  weight: z.number().min(0, "Negative value does not allow"),
  type: z.enum(Object.values(Type)),
  deliveryAddress: z.string(),
  statusLogs: z.array(
    z.object({
      location: z.string(),
      note: z.string(),
    })
  ),
});

const updateParcelStatusValidation = z.object({
  status: z.enum(Object.values(Status)),
  location: z.string(),
  note: z.string().optional(),
});

const confirmDelivaryValidation = z.object({
  location: z.string().optional(),
  note: z.string().optional(),
});

export const ParcelValidation = {
  createParcelValidationSchema,
  updateParcelStatusValidation,
  confirmDelivaryValidation,
};
