import { model, Schema } from "mongoose";
import { IUser, Role, Status } from "./user.interface";
import bcrypt from "bcrypt";
import { envVariable } from "../../config/envConfig";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(Role),
    },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.active,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(envVariable.SALT));
  next();
});

userSchema.post("save", function (doc, next) {
  if (doc) {
    doc.password = "";
  }
  next();
});

userSchema.post("findOneAndUpdate", function (doc, next) {
  if (doc) {
    doc.password = "";
  }
  next();
});

userSchema.post("findOne", function (doc, next) {
  if (doc) {
    doc.password = "";
  }
  next();
});

userSchema.post("find", function (docs, next) {
  if (docs.length > 0) {
    docs.forEach((doc: IUser) => (doc.password = ""));
  }
  next();
});

export const User = model<IUser>("user", userSchema);
