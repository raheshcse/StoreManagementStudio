# Store Management System

A full-stack business management application built using **ASP.NET Core Web API, React, and SQL Server**.  
This project was developed as part of an internship experience to simulate real-world enterprise workflows such as customer management, product tracking, store operations, and sales management.

The system demonstrates full-stack architecture, RESTful API integration, database management, frontend-backend communication, testing, debugging, and cloud deployment practices.

---

# 🚀 Project Overview

The Store Management System was designed to help businesses manage their operational workflows through a centralized admin dashboard.

The application supports:

- Customer Management
- Product Management
- Store Management
- Sales Tracking
- RESTful API Integration
- SQL Server Database Operations
- Cloud Deployment

The project follows a modular and scalable architecture to improve maintainability and separation of concerns.

---

# 🛠 Technologies Used

## Backend
- C#
- ASP.NET Core Web API
- Entity Framework Core
- AutoMapper

## Frontend
- React.js
- Redux Toolkit
- Axios
- React Router
- Vite

## Database
- SQL Server

## Testing & Debugging
- Swagger
- Postman
- Browser Developer Tools

## Deployment & Tools
- Microsoft Azure
- GitHub
- Visual Studio
- VS Code

---

# 🏗 Project Architecture

The application follows a full-stack architecture:

```text
React Frontend
       ↓
ASP.NET Core REST API
       ↓
Entity Framework Core
       ↓
SQL Server Database
```

The frontend communicates with backend APIs using HTTP requests, while Entity Framework Core handles database operations and ORM mapping.

---

# 📂 Frontend Structure

The frontend was built using React with a feature-based folder structure to improve scalability and maintainability.

## Key Frontend Folders

### `components`
Contains reusable UI components:
- Navbar
- Sidebar
- Layout
- Loader
- ErrorMessage

### `features`
Feature-based modules:
- Customers
- Products
- Stores
- Sales

Each feature contains:
- Page components
- Forms
- Redux slices
- API logic

### `Services`
Contains:
- Axios configuration
- API endpoint management

### `routes`
Handles application routing.

---

# ⚙️ Backend Structure

The backend was developed using ASP.NET Core Web API.

## Key Backend Folders

### `Controllers`
Handles HTTP requests and CRUD API endpoints.

Examples:
- CustomersController
- ProductsController
- StoresController
- SalesController

### `Models`
Represents database entities:
- Customer
- Product
- Store
- Sales

### `Dtos`
Data Transfer Objects used for clean API responses and separation of concerns.

### `Profiles`
Contains AutoMapper configuration for DTO mapping.

### `StoreManagementSystemContext`
Entity Framework Core DbContext used for database communication.

---

# 🗄 Database Design

The application uses SQL Server as the relational database.

## Main Tables
- Customers
- Products
- Stores
- Sales

## Relationships
- Sales records are linked with Products and Stores using foreign keys.
- Entity Framework Core was used for ORM mapping and database operations.

---

# 🔄 API Functionality

RESTful APIs were implemented for:
- GET
- POST
- PUT
- DELETE

The APIs support full CRUD functionality for all core business entities.

---

# 🧪 Testing & Debugging

A strong focus was placed on testing and debugging during development.

## Tools Used
- Swagger
- Postman
- Browser Developer Tools

## Testing Performed
- API endpoint validation
- CRUD operation testing
- Response validation
- Error handling verification
- Frontend-backend integration testing

---

# 🐞 Challenges & Problem Solving

## Frontend API Communication Issue
One major issue encountered was a frontend “Failed to fetch” error caused by incorrect API endpoint configuration and HTTPS/CORS mismatches.

### Resolution
- Verified APIs using Swagger and Postman
- Inspected browser network requests
- Corrected API configuration
- Fixed CORS and HTTPS settings

---

## Azure Deployment Challenges
The application initially worked locally but faced deployment issues in Azure due to:
- Connection string configuration
- Environment setup
- Runtime compatibility

### Resolution
- Configured Azure App Service settings
- Managed environment-specific configuration
- Fixed deployment and database connectivity issues

---

# ☁️ Deployment

The application was deployed using:
- Microsoft Azure App Service
- Azure SQL Database

This provided hands-on experience with:
- Cloud deployment
- Environment configuration
- Connection string management
- Real-world application hosting

---

# 📚 Key Learnings

Through this project, I gained practical experience in:

- Full-stack application development
- RESTful API design
- React frontend integration
- SQL Server database management
- Entity Framework Core
- Debugging and troubleshooting
- API testing and validation
- Cloud deployment using Azure
- Scalable project structure and architecture

Most importantly, the project improved my problem-solving skills and understanding of how real-world enterprise applications are developed and maintained.

---

# ▶️ Running the Project Locally

## Backend

```bash
cd StoreManagementStudio.Server
dotnet restore
dotnet run
```

## Frontend

```bash
cd storemanagementstudio.client
npm install
npm run dev
```

---

# 📌 Future Improvements

Potential future enhancements:
- JWT Authentication & Authorization
- Role-Based Access Control
- Advanced Reporting Dashboard
- Inventory Analytics
- CI/CD Pipeline Integration
- Docker Containerization
- AI-Based Sales Insights

---

# 👨‍💻 Author

Rahesh Saravanan

GitHub:  
https://github.com/raheshcse/StoreManagementStudio
