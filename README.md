Academic360
📘 Project Overview

Academic360 is a full-stack Java + React application designed as an e-learning management system.
The backend is built with Spring Boot (Java) and provides a REST API, while the frontend is built with React.js for a modern, user-friendly interface.

This system allows administrators, instructors, and students to manage:

👩‍🎓 Users & Roles (Admin, User)

📚 Courses & Course Details

🗂 Categories & Pathways

📢 Announcements

🏗️ Tech Stack

Backend

Java 17

Spring Boot

Spring Data JPA & Hibernate

MySQL (or other RDBMS)

Maven

Swagger / OpenAPI (API Documentation)

Frontend

React.js (Vite or CRA)

React Router

Axios (API integration)

TailwindCSS / shadcn-ui (UI styling)

🚀 Getting Started
🔹 Backend Setup

Clone the repository:

git clone <YOUR_BACKEND_GIT_URL>
cd Academic360


Configure database in application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/academic360
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password


Build and run:

mvn clean install
mvn spring-boot:run


Access the backend:

Swagger UI: http://localhost:8080/swagger-ui.html

API base URL: http://localhost:8080/api/

🔹 Frontend Setup

Navigate to the frontend directory:

cd frontend


Install dependencies:

npm install


Start the development server:

npm run dev


Access the frontend at:

http://localhost:5173

📡 API Endpoints (Examples)
Authentication

POST /api/auth/user/login – User login

POST /api/auth/admin/login – Admin login

POST /api/auth/logout – Logout

Courses

GET /api/course/page/{pageNumber} – Retrieve paginated courses

POST /api/course/ – Create a new course

PUT /api/course/{courseId} – Update a course

DELETE /api/course/{courseId} – Delete a course

Users

GET /api/users/page/{pageNumber} – Retrieve paginated users

POST /api/users – Create new user

PUT /api/users/{userId} – Update user info

DELETE /api/users/{userId} – Delete user

(And more: CourseDetails, Categories, Pathways, Admin Roles, Announcements.)

🧑‍💻 Development Workflow

Use your preferred IDE (IntelliJ IDEA / VS Code).

For backend changes, edit Java Spring Boot code in src/main/java/.

For frontend changes, edit React components in frontend/src/.

Use GitHub/GitHub Codespaces for collaboration.

🌍 Deployment

Backend: Deploy on Heroku, AWS, or any Java-supported cloud service.

Frontend: Deploy on Vercel, Netlify, or GitHub Pages.

Configure environment variables for API base URL when deploying.

📖 Documentation

API documentation is available at:
http://localhost:8080/swagger-ui.html
