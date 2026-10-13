# EMS Frontend

Employee Management System Frontend built with React TypeScript and Tailwind CSS.

## Prerequisites
- Node.js 16 or higher
- npm or yarn
- Backend API running on port 8082

## Step-by-Step Setup

### 1. Navigate to Frontend Directory
```bash
cd ems-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm start
```

### 4. Access Application
Open browser: http://localhost:3000

## Features
- Real-time attendance dashboard
- Employee check-in/check-out interface
- Employee management (add, view, delete)
- Responsive design for all devices
- Modern UI with Tailwind CSS
- TypeScript for type safety

## Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Navigation
- **Attendance** - Dashboard with check-in/out functionality
- **Employees** - List and manage employees
- **Add Employee** - Form to create new employees

## Troubleshooting
- **Port 3000 busy:** `lsof -ti:3000 | xargs kill -9`
- **Backend connection failed:** Ensure backend is running on port 8082
- **Build errors:** Delete `node_modules` and run `npm install` again# GitHub-automation-Javascript-app
