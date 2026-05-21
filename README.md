# Requirement Management System

This project is a full-stack application for managing requirements with user authentication. It consists of a FastAPI backend, a React frontend, and a PostgreSQL database.

---

## Project Structure

repo/
├── backend/  
├── frontend/  
├── schema.sql  
└── README.md  

---

## Tech Stack

Backend:
- FastAPI
- SQLAlchemy (Async)
- PostgreSQL

Frontend:
- React
- Axios
- React Router
- Tailwind CSS (v3.4.3)

Authentication:
- JWT (Bearer Token)

---

## Architecture Overview

The application follows a clear separation between authentication, business logic, and presentation layers.

Backend:
- Built using FastAPI with async SQLAlchemy
- Uses two independent schemas:
  - auth: stores user credentials
  - app: stores requirement data
- No foreign key relationships between schemas, as per design constraints
- Data ownership is enforced at the application layer using user_id
- JWT-based authentication is used for securing endpoints

Frontend:
- Built with React using functional components and hooks
- React Router is used for routing and protected routes
- Axios is used for API communication
- Authentication state is managed using localStorage
- Token is attached automatically to API requests

Security:
- Passwords are hashed using bcrypt
- JWT tokens contain user identity (user_id)
- Protected endpoints validate token before processing

Data Flow:
1. User logs in and receives a JWT token  
2. Token is stored in localStorage  
3. Frontend sends token with each request  
4. Backend validates token and extracts user_id  
5. Data is filtered using user_id to ensure isolation  

---

## Prerequisites

- Python 3.10 or higher
- Node.js 18 or higher
- PostgreSQL installed and running

---

## Database Setup

1. Create a PostgreSQL database (example: requirements_db)

2. Execute the schema file:

   psql -U postgres -d requirements_db -f schema.sql

This will create:
- auth schema for user data
- app schema for requirements
- required tables, constraints, and indexes

---

## Backend Setup

1. Navigate to backend directory:

   cd backend

2. Create a virtual environment:

   python -m venv venv

3. Activate the environment:

   Windows:
   venv\Scripts\activate

   macOS/Linux:
   source venv/bin/activate

4. Install dependencies:

   pip install -r requirements.txt  
   pip install passlib[bcrypt]==1.7.4 bcrypt==4.0.1

5. Create a .env file in backend directory:

   DATABASE_URL=postgresql+asyncpg://postgres:password@localhost/requirements_db  
   SECRET_KEY=your_secret_key  
   ALGORITHM=HS256  
   ACCESS_TOKEN_EXPIRE_MINUTES=60  

6. Run the backend server:

   uvicorn app.main:app --reload

Backend will be available at:
http://127.0.0.1:8000

API documentation:
http://127.0.0.1:8000/docs

or test using postman

---

## Frontend Setup

1. Navigate to frontend directory:

   cd frontend

2. Install dependencies:

   npm install

3. Install Tailwind CSS (locked version):

   npm install -D tailwindcss@3.4.3 postcss autoprefixer

4. Initialize Tailwind:

   npx tailwindcss init -p

5. Configure Tailwind:

Update tailwind.config.js:

   content: ["./src/**/*.{js,jsx,ts,tsx}"]

Update src/index.css:

   @tailwind base;
   @tailwind components;
   @tailwind utilities;

6. Start frontend:

   npm start

Frontend will be available at:
http://localhost:3000

---

## Frontend Dependencies (Locked)

frontend/package.json:

```json
{
  "name": "frontend",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "axios": "1.6.8",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-router-dom": "6.22.3",
    "react-scripts": "5.0.1"
  },
  "devDependencies": {
    "autoprefixer": "10.4.19",
    "postcss": "8.4.38",
    "tailwindcss": "3.4.3"
  }
}

## Backend Dependencies (Locked)

backend/requirements.txt:

fastapi==0.111.0
uvicorn==0.30.1
sqlalchemy==2.0.30
asyncpg==0.29.0
python-dotenv==1.0.1
passlib[bcrypt]==1.7.4
bcrypt==4.0.1
python-jose==3.3.0
pydantic==2.7.1