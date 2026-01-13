import { createBrowserRouter, Navigate } from 'react-router-dom'
import { MainLayout } from '../components/layout/MainLayout'
import { Login } from '../pages/auth/Login'
import { Dashboard } from '../pages/dashboard/Dashboard'
import { PlayersList } from '../pages/players/PlayersList'
import { PlayerDetail } from '../pages/players/PlayerDetail'
import { TeamsList } from '../pages/teams/TeamsList'
import { TeamDetail } from '../pages/teams/TeamDetail'
import { MatchesList } from '../pages/matches/MatchesList'
import { MatchDetail } from '../pages/matches/MatchDetail'
import { TournamentsList } from '../pages/tournaments/TournamentsList'
import { TournamentDetail } from '../pages/tournaments/TournamentDetail'
import { Stats } from '../pages/stats/Stats'
import { Notifications } from '../pages/notifications/Notifications'
import { Settings } from '../pages/settings/Settings'
import { ProtectedRoute } from './ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'players',
        element: <PlayersList />,
      },
      {
        path: 'players/:id',
        element: <PlayerDetail />,
      },
      {
        path: 'teams',
        element: <TeamsList />,
      },
      {
        path: 'teams/:id',
        element: <TeamDetail />,
      },
      {
        path: 'matches',
        element: <MatchesList />,
      },
      {
        path: 'matches/:id',
        element: <MatchDetail />,
      },
      {
        path: 'tournaments',
        element: <TournamentsList />,
      },
      {
        path: 'tournaments/:id',
        element: <TournamentDetail />,
      },
      {
        path: 'stats',
        element: <Stats />,
      },
      {
        path: 'notifications',
        element: <Notifications />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
])

