# Writso: A Platform for Collaborative Writing and Fact-Checking

Writso is a web application designed to foster a community of writers and fact-checkers. It provides a platform for users to submit articles, respond to daily statements, and engage in discussions, all while maintaining a focus on accuracy and quality through a community-driven scoring system.

## Vision

Our vision is to create a space where users can collaboratively build a knowledge base of well-researched and fact-checked articles. We aim to combat misinformation by empowering users to contribute, verify, and discuss information in an open and transparent manner.

## Features

- **User Authentication:** Secure user registration and login using NextAuth.js.
- **Article Submission:** Users can write and submit their own articles.
- **Daily Statements:** A daily statement is provided for users to respond to, encouraging regular engagement.
- **Community Scoring:** Articles are scored based on community feedback, including upvotes and downvotes.
- **Commenting:** Users can leave comments on articles to provide feedback and engage in discussions.
- **Submission Viewing:** Users can view all submissions for a particular article or statement, as well as their own submissions.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Database:** The project is configured to use a database with Prisma. You can set up your preferred database (e.g., PostgreSQL, MySQL, SQLite).

## Future Scope

- **User Profiles:** Dedicated user profiles showcasing their contributions and scores.
- **Advanced Scoring Algorithm:** Implementation of a more sophisticated scoring algorithm to better assess article quality.
- **Social Sharing:** Ability for users to share articles and submissions on social media.
- **Notifications:** Real-time notifications for comments, votes, and other interactions.
- **Admin Dashboard:** A dashboard for administrators to manage users, articles, and other site content.
- **Gamification:** Introduce badges, leaderboards, and other gamification elements to encourage participation.

## Getting Started

First, you need to set up your database and environment variables.

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Set up your database:**
    - Install your desired database (e.g., PostgreSQL).
    - Create a `.env` file by copying `.env.example`.
    - Update the `DATABASE_URL` in your `.env` file to point to your database.

3.  **Run database migrations:**

    ```bash
    npx prisma migrate dev
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
