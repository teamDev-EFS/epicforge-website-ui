# Admin Portal Login Credentials

## 🔐 How to Access Admin Portal

### ✅ Default Admin Credentials (Already Created)

An admin user has been created with these credentials:

- **Email**: `admin@epicforgesoftware.com`
- **Password**: `Admin123!`
- **Role**: `admin`

**You can login immediately with these credentials!**

⚠️ **IMPORTANT**: Change this password after first login for security.

### Create New Admin User (Optional)

### Step 0: Install Dependencies (Required)

First, make sure you have installed the required dependencies:

```bash
cd backend
npm install
```

This will install the required packages including `bcryptjs` and `jsonwebtoken` that are needed for authentication.

### Step 1: Create Your First Admin User

The system allows the **first user** to register as admin without authentication. After that, only existing admins can create new users.

#### Option A: Using Admin Registration Page

1. Navigate to the admin registration page:

   - **Local**: `http://localhost:5173/register` (if admin routes are set up)
   - Or access the admin app directly at `http://localhost:5174/register`

2. Fill in the registration form:

   - **Name**: Your name (e.g., "Admin User")
   - **Email**: Your email address (e.g., "admin@epicforgesoftware.com")
   - **Password**: Choose a strong password (minimum 6 characters)
   - **Note**: The first user automatically gets "admin" role

3. Click "Create User"

#### Option B: Using API Directly

Make a POST request to create the first admin user:

```bash
# Using curl
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@epicforgesoftware.com",
    "password": "YourSecurePassword123",
    "role": "admin"
  }'
```

**Important**: The first user registered automatically gets `admin` role, regardless of what you specify.

### Step 2: Login to Admin Portal

1. Navigate to the admin login page:

   - **Main Site**: `http://localhost:5173/login`
   - **Admin App**: `http://localhost:5174/login` (if separate admin app)

2. Enter your credentials:

   - **Email**: The email you used during registration
   - **Password**: The password you set

3. Click "Sign in"

### Step 3: Access Admin Dashboard

After successful login, you'll be redirected to the admin dashboard where you can:

- View and manage leads
- Manage content
- View statistics
- Create additional users (staff/admin)

## 🔑 Your Admin Credentials

**Email**: `admin@epicforgesoftware.com` (or the email you registered with)  
**Password**: `[The password you set during registration]`

## ⚠️ Security Notes

1. **Change Default Password**: If you used a simple password during setup, change it immediately after first login.

2. **Create Staff Users**: After your admin account is created, you can create additional staff/admin users from the admin dashboard.

3. **API Endpoint**:

   - **Login**: `POST http://localhost:5000/api/auth/login`
   - **Register** (first user only): `POST http://localhost:5000/api/auth/register`

4. **Environment Variables**: Ensure your backend server is running and `VITE_API_URL` is set correctly in your frontend `.env` file.

## 🚀 Quick Setup Command

**IMPORTANT**: Make sure your backend server is running first!

```bash
# Navigate to backend directory
cd backend

# Install dependencies (if not already done)
npm install

# Start the backend server
npm start
# or for development
npm run dev
```

Then in a new terminal, create your admin user:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@epicforgesoftware.com",
    "password": "Admin123!",
    "role": "admin"
  }'
```

Then login at `http://localhost:5173/login` with:

- **Email**: `admin@epicforgesoftware.com`
- **Password**: `Admin123!`

**⚠️ Remember to change this password after first login!**

## ✅ Verify Backend is Running

Test that the auth endpoint is working:

```bash
curl http://localhost:5000/api/health
```

You should see:

```json
{
  "success": true,
  "message": "EpicForge Backend API is running",
  ...
}
```
