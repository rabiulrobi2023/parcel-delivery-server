import { envVariable } from "../config/envConfig";
import { IUser, Role, Status } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

const seedSuperAdmin = async () => {
  const superAdmin: Partial<IUser> = {
    name: "Super Admin",
    email: envVariable.SUPER_ADMIN_EMAIL,
    password: "123456",
    role: Role.superAdmin,
    isDeleted: false,
    status: Status.active,
  };

  const isSuperAdminExists = await User.findOne({ role: Role.superAdmin });
  if (!isSuperAdminExists) {
    await User.create(superAdmin);
  }
};

export default seedSuperAdmin;
