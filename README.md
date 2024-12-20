# GameSquad 🎮

GameSquad is a web application that helps gamers connect, organize gaming sessions, and share game recommendations with friends.

## Features ✨

- **Authentication** 
  - Email/Password sign up and login
  - Secure session management

- **Gaming Sessions**
  - Create and join gaming sessions
  - Set difficulty levels and player limits
  - Automatic session cleanup for expired sessions
  - Real-time participant tracking

- **Friend System**
  - Send and receive friend requests
  - View friend profiles
  - See friends' gaming activities

- **Game Recommendations**
  - Recommend games to the community
  - Rate and review games
  - Share your gaming experience level
  - View community recommendations

- **Notifications**
  - Real-time notifications for:
    - Friend requests
    - Session invites
    - New recommendations
    - Session updates

## Tech Stack 🛠

- **Frontend**
  - Next.js 15
  - Tailwind CSS
  - Framer Motion
  - Shadcn/ui
  - TypeScript
  - Lucide Icons

- **Backend**
  - Convex (Backend as a Service)
  - Real-time database
  - Scheduled tasks (cron jobs)

## Getting Started 🚀

1. Clone the repository:

```bash
git clone https://github.com/ElioTourvieille/GameSquad.git
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
npx convex dev
```

4. Run the development server:
```bash
npm run dev
```

## Project Structure 📁

```
/
├── app/                # Next.js app router pages
├── components/         # React components
├── convex/            # Backend functions and schema
├── hooks/             # Custom React hooks
├── lib/              # Utility functions
└── public/           # Static assets
```

## License 📝

This project is licensed under the MIT License - see the LICENSE file for details.

## Author ✍️

Elio Tourvieille
