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
DATABASE_URL=your_postgresql_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
GEMINI_API_KEY=your_gemini_api_key
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
