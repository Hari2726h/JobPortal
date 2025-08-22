🏢 Job Portal Platform

A full-stack Job Portal Platform that connects recruiters and job seekers, enabling smooth hiring, job posting, and application management. Built with a modern tech stack, the platform ensures scalability, security, and a user-friendly interface.

🚀 Features
👨‍💼 For Job Seekers

User authentication (login/signup with JWT security).

Browse jobs with search and filtering (by title, company, location, skills, etc.).

View detailed job descriptions and requirements.

Apply for jobs directly through the platform.

Track application status (Applied, Shortlisted, Rejected, Hired).

Update personal profile, resume, and skills.

🏢 For Employers / Recruiters

Create company profiles.

Post and manage job listings.

View applications and shortlist candidates.

Update job posting details or close positions.

Download applicants' resumes.

⚙️ Admin Panel

Manage users and recruiters.

Approve/Reject recruiter accounts.

Monitor platform activity.

Remove inappropriate job postings.

🛠️ Tech Stack
Frontend

React.js / Next.js

Axios (API integration)

Bootstrap / TailwindCSS

Backend

Spring Boot (REST APIs)

Spring Security + JWT Authentication

Hibernate / JPA

Database

MySQL

Deployment

Docker

AWS EC2 / ECR / RDS

Nginx (reverse proxy)

📂 Project Structure
JobPortal/
│── frontend/        # React app
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Login, Register, Dashboard, etc.
│   │   ├── api/          # Axios services
│   │   └── utils/        # Helpers & hooks
│── backend/         # Spring Boot app
│   ├── src/main/java/com/examly/springapp/
│   │   ├── controller/   # REST Controllers
│   │   ├── model/        # Entities
│   │   ├── repository/   # JPA Repositories
│   │   ├── service/      # Business logic
│   │   └── config/       # Security & JWT configs
│── docker-compose.yml
│── README.md

⚡ Getting Started
1. Clone the repository
git clone https://github.com/your-username/job-portal.git
cd job-portal

2. Backend Setup (Spring Boot)
cd backend
./mvnw clean install
./mvnw spring-boot:run


Backend runs on: http://localhost:8080

3. Frontend Setup (React)
cd frontend
npm install
npm start


Frontend runs on: http://localhost:3000

🔑 API Endpoints (Sample)
Auth

POST /api/auth/register → Register new user/recruiter

POST /api/auth/login → Login & get JWT token

Jobs

GET /api/jobs → Get all jobs

POST /api/jobs → Create a job (Recruiter only)

GET /api/jobs/{id} → Get job details

DELETE /api/jobs/{id} → Delete job

Applications

POST /api/applications → Apply for a job

GET /api/applications/user/{userId} → User’s applications

GET /api/applications/job/{jobId} → All applicants for a job

📸 Screenshots (Optional)

Landing page

Job listing page

Application tracking

Admin dashboard

🐳 Deployment with Docker

Build and run with Docker Compose:

docker-compose up --build


Services:

Frontend → http://localhost:3000

Backend → http://localhost:8080

MySQL → localhost:3306

🤝 Contributing

Fork the project.

Create your feature branch (git checkout -b feature/AmazingFeature).

Commit changes (git commit -m 'Add some AmazingFeature').

Push to the branch (git push origin feature/AmazingFeature').

Open a Pull Request.

📜 License

This project is licensed under the MIT License – feel free to use and modify.

👨‍💻 Author

Hariharan C

LinkedIn: Your Profile

GitHub: Your Profile

Email: ENTER_EMAIL_ADDRESS_HERE

✨ A complete Job Portal solution for modern hiring needs – scalable, secure, and user-friendly.
