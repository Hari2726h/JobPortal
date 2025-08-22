🏢 Job Portal Platform

A full-stack Job Portal Platform that connects recruiters and job seekers, enabling smooth hiring, job posting, and application management. Built with a modern tech stack, the platform ensures scalability, security, and a user-friendly interface.

🚀 Features
👨‍💼 For Job Seekers

User authentication (login/signup with JWT <img width="1920" height="1020" alt="Screenshot 2025-08-21 203055" src="https://github.com/user-attachments/assets/2ae4918d-cd06-4e7e-b07c-ae995f623fd4" />
<img width="1920" height="1020" alt="Screenshot 2025-08-21 203047" src="https://github.com/user-attachments/assets/59a86c0c-b21d-4a99-bdbf-87a2fbd900e6" />
<img width="1920" height="1020" alt="Screenshot 2025-08-21 203042" src="https://github.com/user-attachments/assets/d8bb1340-1679-484c-84f4-6c5e1fae84bb" />
<img width="1920" height="1020" alt="Screenshot 2025-08-21 203002" src="https://github.com/user-attachments/assets/79b3ea78-5b6d-47d0-b489-899337fbb83d" />
<img width="1920" height="1020" alt="Screenshot 2025-08-21 202923" src="https://github.com/user-attachments/assets/b563c59b-7a1d-452d-978b-5def956ab249" />
<img width="1920" height="1020" alt="Screenshot 2025-08-21 202907" src="https://github.com/user-attachments/assets/18785d44-7606-48b7-bd85-41cfdfac8031" />
<img width="1920" height="1020" alt="Screenshot 2025-08-21 203113" src="https://github.com/user-attachments/assets/60594f01-97ab-4114-823c-e4188d7883c9" />
<img width="1920" height="1020" alt="Screenshot 2025-08-21 203103" src="https://github.com/user-attachments/assets/a1dc0341-72c1-4355-99e2-5fcfc28b82b7" />
s<img width="1920" height="1020" alt="Screenshot 2025-08-21 202736" src="https://github.com/user-attachments/assets/17fe0f8f-2b3d-4ab5-9d58-e0f552da6019" />
<img width="1920" height="1020" alt="Screenshot 2025-08-20 144306" src="https://github.com/user-attachments/assets/9d05269d-8bf8-4670-866d-eb4e9ba81b75" />
<img width="1920" height="1020" alt="Screenshot 2025-08-20 134709" src="https://github.com/user-attachments/assets/fa4ec774-4869-4384-92a0-abc019086639" />
<img width="1920" height="1020" alt="Screenshot 2025-08-21 202858" src="https://github.com/user-attachments/assets/a5cbc2f0-ea01-49c0-9b0d-9835816fd55e" />
<img width="1920" height="1020" alt="Screenshot 2025-08-21 202833" src="https://github.com/user-attachments/assets/104611d5-cfb3-46a2-9a1d-ae4ca341f85c" />
ecurity).

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
