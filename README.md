![alt text](https://github.com/Adeel-Farooq-Khan/AI-Interview-Mocker/raw/main/CI1.jpg)
# AI Interview Mocker

## Overview
AI Interview Mocker is a web application that provides AI-powered mock interview experiences, helping users practice and improve their interview skills using advanced AI technologies.

## Tech Stack
- Next.js 15
- Drizzle ORM
- PostgreSQL
- Gemini AI API
- Clerk Authentication
- Tailwind CSS
- Shadcn UI

## Features
- AI-generated interview questions
- Real-time interview simulation
- Detailed feedback and performance analysis
- User authentication
- Interview history tracking

## Prerequisites
- Node.js (v18+)
- PostgreSQL
- Clerk Account
- Gemini AI API Key

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Adeel-Farooq-Khan/AI-Interview-Mocker.git
cd ai-interview-mocker
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file with:
```
NEXT_PUBLIC_DRIBBLE_URL=your_postgresql_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT = 5
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_INFORMATION = "Enable Video Web Cam and Microphone to Start your Al Generated Mock Interview, It Has 5 question which you can answer and at the last you will get the report on the basis of your answer. NOTE: We never record your video, Web cam access you can disable at any time if you want"
NEXT_PUBLIC_NOTE = "Click on Record Answer when you want to answer the question. At the end of interview we will give you the feedback along with correct answer for each of question and your answer to comapre it."
```

### 4. Database Setup
```bash
npm run db:push
npm run db:studio
```

### 5. Run Development Server
```bash
npm run dev
```

## Database Schema
- MockInterview
- UserAnswers

## Authentication
Powered by Clerk, supporting:
- Email/Password
- Google Account
- Facebook Account

## AI Integration
Gemini AI generates:
- Interview questions
- Performance feedback
- Answer evaluations

## Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create pull request

## Contact
Your Name - adeelfarooq417@example.com
