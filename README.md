# B2T-JOB

Welcome to the B2T-JOB project!

## Project Description

The B2T-JOB project is a comprehensive job portal designed to streamline the job search and application process for both job seekers and employers. The platform offers a user-friendly interface and a range of features to enhance the recruitment experience. Job seekers can easily browse and apply for job listings, while employers can post job openings and manage applications efficiently. The project aims to bridge the gap between talent and opportunity, making the job market more accessible and efficient for everyone involved.

## Job Home Page

The job home page provides an overview of the available job listings. Users can see featured jobs, recent postings, and navigate through different job categories.

![Job Home Page](client/src/assets/image-git/homepage.png)

## Job Search

The job search feature allows users to find job listings based on various criteria such as location, job title, and company. Users can filter and sort the results to find the most relevant opportunities.

### Search by Name

Users can search for jobs by entering specific keywords or job titles in the search bar.

![Search by Name](client/src/assets/image-git/search-name.png)

### Search by Category

Users can filter job listings by selecting specific job categories. This helps in narrowing down the search to more relevant job opportunities.

![Search by Category](client/src/assets/image-git/search-category.png)

## Manage Account

Users can manage their personal information, resume, and application history on the account management page.

![Manage Account](client/src/assets/image-git/manage-account.png)

## Upload CV

Users can upload their CVs to enhance their profiles and make it easier for employers to find them.

![Upload CV](client/src/assets/image-git/upload-cv.png)

## Register Admin

Admins can register and gain access to the employer dashboard to manage job postings and applications.

![Register Admin](client/src/assets/image-git/register-admin.png)

## Login Admin

Admins can log in to access the employer dashboard and manage their recruitment process.

![Login Admin](client/src/assets/image-git/login-admin.png)

## Login Account Applicant by Google

Applicants can log in using their Google accounts for a seamless sign-in experience.

![Login Account Applicant by Google](client/src/assets/image-git/login-gg.png)

## Job Applied

Applicants can view the jobs they have applied for and track the status of their applications.

![Job Applied](client/src/assets/image-git/job-applied.png)

## Job Applied Success

Applicants receive a confirmation when they successfully apply for a job.

![Job Applied Success](client/src/assets/image-git/apply-success.png)

## Admin Dashboard

The admin dashboard provides tools for employers to post job listings, review applications, and manage their recruitment process.

![Admin Dashboard](client/src/assets/image-git/manage-job.png)

## Admin Add Job

Admins can add new job listings through the employer dashboard.

![Admin Add Job](client/src/assets/image-git/add-job.png)

## Admin Applications

Admins can manage and review the status of job applications through the employer dashboard.

![Admin Applications](client/src/assets/image-git/manage-status.png)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

B2T-JOB is a web application designed to connect job seekers with potential employers. The platform allows users to search for job listings, apply for jobs, and manage their applications.

## Database

The B2T-JOB project uses MongoDB as its database to store and manage data. MongoDB is a NoSQL database that provides flexibility and scalability, making it an ideal choice for handling the dynamic data requirements of a job portal.

![Mongo DB](client/src/assets/image-git/MongoDB-Logo.png)

### MongoDB Collections

The following collections are used in the B2T-JOB project:

- `users`: Stores user information, including personal details, login credentials, and user roles (job seeker or employer).
- `jobs`: Contains job listings posted by employers, including job title, description, requirements, and application deadlines.
- `applications`: Tracks job applications submitted by job seekers, including the status of each application.
- `categories`: Lists job categories to help users filter job listings based on their interests and expertise.

### Database Configuration

To connect to the MongoDB database, ensure that the `MONGO_URI` environment variable is set in the `.env` file. The `MONGO_URI` should contain the connection string for your MongoDB instance.

Example `.env` configuration:

```env
MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/b2t-job?retryWrites=true&w=majority
```

Make sure to replace `username`, `password`, and `cluster0` with your actual MongoDB credentials and cluster information.

By using MongoDB, the B2T-JOB project can efficiently manage user data, job listings, and applications, providing a seamless experience for both job seekers and employers.

## Features

- User authentication and authorization
- Job search functionality
- Job application management
- Employer job posting
- User profile management

## Installation

To get started with the B2T-JOB, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/B2T-JOB.git
   ```

2. Navigate to the project directory:

   ```bash
   cd B2T-JOB
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Configure the environment variables in the `.env` file. Refer to the `.env.example` file for the required variables. Below is a detailed description of the environment variables used:

      - `PORT`: The port number on which the server will run. Default is `3000`.
      - `MONGO_URI`: The connection string for the MongoDB database.
      - `JWT_SECRET`: The secret key used for signing JSON Web Tokens.
      - `GOOGLE_CLIENT_ID`: The client ID for Google OAuth authentication.
      - `GOOGLE_CLIENT_SECRET`: The client secret for Google OAuth authentication.
      - `CLOUDINARY_URL`: The URL for Cloudinary, used for image uploads.
      - `EMAIL_SERVICE`: The email service provider (e.g., Gmail, SendGrid).
      - `EMAIL_USERNAME`: The username for the email service.
      - `EMAIL_PASSWORD`: The password for the email service.
      - `EMAIL_FROM`: The email address from which emails will be sent.

      Ensure that all these variables are correctly set in your `.env` file to enable the application to function properly.

5. Start the client development server:

   ```bash
   npm run dev
   ```

6. Start the server:
   ```bash
   npm run server
   ```

## Usage

Once the development server and the backend server are running, you can access the application at `http://localhost:5173`. From there, you can create an account, search for jobs, and manage your applications. The backend server will be running on `http://localhost:5000`.

## Contributing

We welcome contributions to the B2T-JOB project! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with a descriptive message.
4. Push your changes to your fork.
5. Open a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
