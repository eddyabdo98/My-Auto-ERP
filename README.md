# My-Auto-ERP

A comprehensive ERP system with inventory management, sales, purchases, user management, and more.

## Features

- User Authentication and Role Management
- Inventory Management
- Client Management
- Purchase Management
- Sales Management
- Cash Register
- Expense Tracking
- Supplier Management
- Stock Management
- Reporting

## Technical Stack

- Frontend: React + TypeScript + Material-UI
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL
- Authentication: JWT + bcrypt

## Getting Started

### Prerequisites

- Node.js >= 18
- PostgreSQL >= 14
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/eddyabdo98/My-Auto-ERP.git
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables
```bash
# Backend (.env)
cp .env.example .env

# Frontend (.env)
cp .env.example .env
```

4. Start the services
```bash
# Start backend (runs on port 12345)
cd backend
npm run dev

# Start frontend (runs on port 12346)
cd frontend
npm run dev
```

## License

MIT