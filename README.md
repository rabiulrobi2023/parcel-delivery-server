## Parcel Delivery System
#### Welcome to parcel delivery system app. It is a backend app that using you can manage parcel delivery system. Here role base user registration, authentication and services implemented.

## Key Features
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
    
## Uses Technologis
  1. Node.js: Node.js used as programming language for the backend app
  2. Express: Express used as framework of Node.js
  3. Typescript: For type safe typescript is used
  4. MongoDB: MongDB used as database of this project.
  5. Mongoose: Mongoose is library which used mongoDB data modeling.
  6. JWT: For user authentication JWT is used
  7. Zod: For data validation zod is used
  8. Brypt: For password hashing bcrypt is used

## Environmet Instruction
  PORT = 5000 </br>
  DB_URL = mongodb+srv://<username>:<password>@<cluster-url>.9f4uluw.mongodb.net/<db_name>?retryWrites=true&w=majority&appName=Cluster0  </br>
  
  NOVE_ENV = production  </br>
  SALT = 10  </br>
  
  JWT_ACCESS_SECRET = your_jwt_access_secret  </br>
  JWT_ACCESS_EXPIRE = 10d  </br>
  
  JWT_REFRESH_SECRET = your_jwt_refresh_secret  </br>
  JWT_REFRESH_EXPIRE = 30d  </br>
  
  SUPER_ADMIN_EMAIL = superadmin@gmail.com  </br>
  SUPER_ADMIN_PASS = superadmin  </br>

## API
### Base API: 
parcel-delivery-server-psi.vercel.app/api/v1

### Endpoints

<table>
  <tr>
    <th>Model</th>
    <th>Description</th>
    <th>Endpoint</th>
    <th>Method</th>
    <th>Role</th>
    <th>Body</th>
  </tr>
  <tr>
    <td>auth</td>
    <td>User Login</td>
    <td>/auth/login</td>
    <td>POST</td>
    <td>admin, superAdmin, sender, receiver</td>
    <td>      
      
      {
          "email": "superadmin@gmail.com",
          "password": "superadmin"
      }
      
  </td>
  </tr>
  
  <tr>
    <td>user</td>
    <td>Create Admin</td>
    <td>/user/create-admin</td>
    <td>POST</td>
    <td>superAdmin</td>
    <td>      
      
    {
      "name": "Admin1",
      "email": "admin1@gmail.com",
      "phone": "01712345678",
      "address": "Dinajpur Sadar, Dinajpur",
      "password": "admin1",
      "role": "admin"
    }
      
  </td>
  </tr>
  
  <tr>
    <td>user</td>
    <td>User Registration</td>
    <td>/user/register</td>
    <td>POST</td>
    <td>public</td>
    <td>      
      
    {
      "name": "Sender One",
      "email": "sender@gmail.com",
      "phone": "01700000001",
      "address": "Bogura Sadar, Bogura",
      "password": "123456", 
      "role": "sender"
    }
      
  </td>
  </tr>
  
  <tr>
    <td>user</td>
    <td>Get All Users</td>
    <td>/user</td>
    <td>GET</td>
    <td>admin, superAdmin</td>
    <td>NA</td>
  </tr>
  
  <tr>
    <td>user</td>
    <td>Get Single Users</td>
    <td>/user/:id</td>
    <td>GET</td>
    <td>admin, superAdmin</td>
    <td>NA</td>
  </tr>
  
  <tr>
    <td>user</td>
    <td>Get Me</td>
    <td>/user/me</td>
    <td>GET</td>
    <td>admin, superAdmin, sender, receiver</td>
    <td>NA</td>
  </tr>
  
  <tr>
    <td>user</td>
    <td>Block an User</td>
    <td>/user/block-user/:id</td>
    <td>PATCH</td>
    <td>admin, superAdmin</td>
    <td>NA</td>
  </tr>
  
  <tr>
    <td>user</td>
    <td>Unblock an User</td>
    <td>/user/unblock-user/:id</td>
    <td>PATCH</td>
    <td>admin, superAdmin</td>
    <td>NA</td>
  </tr>
  
  <tr>
    <td>user</td>
    <td>Delete an User</td>
    <td>/user/:id</td>
    <td>PATCH</td>
    <td>admin, superAdmin</td>
    <td>NA</td>
  </tr>
  
  <tr>
    <td>parcel</td>
    <td>My Sent Parcel</td>
    <td>/parcels/mine</td>
    <td>GET</td>
    <td>sender</td>
    <td>NA</td>
  </tr>
  
  <tr>
    <td>parcel</td>
    <td>Cancel a Parcel</td>
    <td>/parcels/cancel/:parcelId</td>
    <td>PATCH</td>
    <td>sender</td>
    <td>NA</td>
  </tr>
  
  <tr>
    <td>parcel</td>
    <td>Get all Parcel</td>
    <td>/parcels</td>
    <td>GET</td>
    <td>admin, superAdmin</td>
    <td>NA</td>
  </tr>
  
  <tr>
    <td>parcel</td>
    <td>Get Single Parcel</td>
    <td>/parcels/:parcelId</td>
    <td>GET</td>
    <td>admin, superAdmin</td>
    <td>NA</td>
  </tr>
  
  <tr>
    <td>parcel</td>
    <td>Block Single Parcel</td>
    <td>/parcels/block-parcel/:parcelId</td>
    <td>PATCH</td>
    <td>admin, superAdmin</td>
    <td>
  
    {
      "location": "Bogura",
      "note": "Blocked the parcel"
    }
  </td>
  </tr>
  
  <tr>
    <td>parcel</td>
    <td>Update Status and Tracking</td>
    <td>/parcels/status/:parcelId</td>
    <td>PATCH</td>
    <td>admin, superAdmin</td>
    <td>
      
    {
      "status": "approved",
      "location": "Dinajpur, Bangladesh",
      "note": "The parcel is now transit from Dinajpur to Bogura"
    }
  </td>
  </tr>

  <tr>
    <td>parcel</td>
    <td>My Incomming Parcel</td>
    <td>/parcels/incoming</td>
    <td>GET</td>
    <td>receiver</td>
    <td>NA</td>
  </tr>
  
  <tr>
    <td>parcel</td>
    <td>Delivery Confirm</td>
    <td>/parcels/confirm/:parcelId</td>
    <td>PATCH</td>
    <td>receiver</td>
    <td>NA</td>
  </tr>


  
</table>
