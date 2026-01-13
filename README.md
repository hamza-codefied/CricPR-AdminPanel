# CricPR Admin Panel

A premium, modern admin panel for the CricPR (Cricket Scoring App) built with React, Vite, and TailwindCSS.

## Features

- 🎨 **Modern UI/UX** - Premium design with clean typography, elegant cards, and smooth animations
- 🌓 **Dark/Light Mode** - Beautiful theme toggle with consistent colors in both modes
- 📱 **Fully Responsive** - Perfect experience on Desktop, Tablet, and Mobile
- 🔐 **Authentication** - Secure login with protected routes
- 📊 **Dashboard** - Rich statistics and interactive charts
- 👥 **Player Management** - Complete CRUD operations for players
- 🏏 **Team Management** - Team details, statistics, and player lists
- 🎯 **Match Management** - Match tracking, scorecards, and results
- 🏆 **Tournament Management** - Tournament details, fixtures, and points tables
- 📈 **Statistics** - Comprehensive stats and analytics
- 🔔 **Push Notifications** - Send notifications to app users
- 📄 **CSV Export** - Export any table data to CSV

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **ShadCN UI** - Component library
- **React Router v6** - Routing
- **React Hook Form + Zod** - Form validation
- **Zustand** - State management
- **Recharts** - Charts and graphs
- **Axios** - HTTP client
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (package manager)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd CricPR-AdminPanel
```

2. Install dependencies
```bash
pnpm install
```

3. Start the development server
```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Login Credentials

- **Email:** admin@cricpr.com
- **Password:** admin123

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable components
│   ├── common/      # Common components (PageHeader, StatCard, etc.)
│   ├── layout/      # Layout components (Sidebar, Header, etc.)
│   └── ui/          # ShadCN UI components
├── pages/           # Page components
│   ├── auth/        # Authentication pages
│   ├── dashboard/   # Dashboard page
│   ├── players/     # Player management pages
│   ├── teams/       # Team management pages
│   ├── matches/     # Match management pages
│   ├── tournaments/ # Tournament management pages
│   ├── stats/       # Statistics page
│   ├── notifications/ # Notifications page
│   └── settings/    # Settings page
├── router/          # Router configuration
├── services/        # API services and mock data
├── store/           # Zustand stores
├── theme/           # Theme configuration
└── utils/           # Utility functions
```

## Theme Colors

The admin panel uses CricPR brand colors:

- **Primary:** #0E795D
- **Secondary:** #01411C
- **Red:** #D70505
- **And more...** (See `tailwind.config.js` for full color palette)

## Features in Detail

### Dashboard
- Stat cards showing key metrics
- Interactive charts (Line, Bar, Horizontal Bar)
- Recent matches table
- Responsive grid layout

### Players Module
- List all players with search and filters
- Add/Edit/Delete players
- Player detail page with stats, matches, and performances
- Export to CSV

### Teams Module
- Team listing with statistics
- Team detail page with tabs:
  - Matches
  - Players
  - Top Performances

### Matches Module
- Match listing with filters
- Match detail page with scorecards
- Innings details and player performances

### Tournaments Module
- Tournament listing
- Tournament detail with:
  - Fixtures
  - Points table
  - Top performers

### Statistics Module
- Comprehensive statistics
- Top run scorers and wicket takers
- Best averages
- CSV export functionality

### Notifications Module
- Send push notifications
- Notification history
- Target all users or selected users

## Building for Production

```bash
pnpm build
```

The built files will be in the `dist` directory.

## Development

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint
pnpm lint
```

## Notes

- Currently uses mock data for development
- Replace mock API calls in `src/services/` with actual API endpoints
- Update authentication logic in `src/store/useAuthStore.ts` to connect to your backend
- All forms use React Hook Form + Zod for validation
- Theme is persisted in localStorage
- Auth state is persisted in localStorage

## License

MIT
