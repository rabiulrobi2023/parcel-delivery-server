## Parcel Delivery System
### Welcome to parcel delivery system app. It is a backend app that using a you can manage parcel delivery system. Here role base user registration, authentication and services implemented.

## Features
### 1. Role Base Account Registration
  - Super Admin Account: A super admin account will be automatically created when the app connected to database if there have no a super admin account already exists
  - Admin Account: Only super admin can be create admin account using email id and password.
  - Sender Account: Anyone can be registration as sender account using a email id and password.
  - Receiver Account: Anyone can be registration as a receiver account usign a email id and password.

### 2. Parcel Management
  - Only sender can be create a parcel to send another
  - When create a parcel successfully its staus is show by default requested
  - After create a parcel sender can cancelled his parcel before approving by admin
  - After approving sender can not cancelle his parcel
  - A sender can see the all parcel which created by him

  - An admin or super admin can approve or block a parcel.
  - After approve a parcel the admin or super admin can update the following steps:
      i. Dispatched
      ii. In-transit
    Note: A cancelled parcel is not possible to dispatched. Without dispatched can not possible update as in-transit. So the update logs of parcel maintain the following sequence:

    requested ➡️ approved ➡️ dispatched ➡️ in-transit ➡️ delivered
  - Admin and super admin can see all parcel

  - A reveiver can see the parcel which incoming to him
  - Reveiver can confirm dilivered the incomming parcels
  - After delivered a parcel there have no any chance to update any step

### 3. User Management:
  - Admin and super admin can see all users
  - Admin and super admin can see any specific user
  - Admin and super admin can block any user
  - Admin and super admin can delete any user
  - Admin or  super admin can unblock any blocked user
  - Admin, super admin, sender, and reveiver and see indivudual account.
  - Without admin or super admin, others user can see others account.
