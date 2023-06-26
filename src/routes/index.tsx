import { Route, Routes, useLocation } from 'react-router-dom'
import { LoginPage } from '../pages/login'
import { RegisterPage } from '../pages/register'
import { HomePage } from '../pages/home'
import { UserProfile } from '../pages/userProfile'
import { FriendsPage } from '../pages/friends'

export function Router() {
  const location = useLocation()

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<LoginPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/:username" element={<UserProfile />} />
      <Route path="/friends" element={<FriendsPage />} />
    </Routes>
  )
}
