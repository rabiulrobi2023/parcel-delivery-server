import { Parcel } from "./parcel.model";

export const generateTnxId = async () => {
  const lastParcel = await Parcel.findOne().sort("-createdAt");

  const now = new Date();
  const year = now.getFullYear().toString();
  const month = Number(now.getMonth()+1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  let tnxId = "";
  if (!lastParcel) {
    tnxId = `TRK-${year}${month}${day}-000001`;
  } else {
    const lastTnxId = lastParcel?.transactionId;
    const lastPartOfLastTnxId = Number(lastTnxId?.split("-")[2]);
    const newLastPartOfLastTnxId = (lastPartOfLastTnxId + 1)
      .toString()
      .padStart(6, "0");
    tnxId = `TRK-${year}${month}${day}-${newLastPartOfLastTnxId}`;
  }
  return tnxId;
};
