import z from "zod";
import { Type } from "./parcel.interface";

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

export const ParcelValidation = {
  createParcelValidationSchema,
};
