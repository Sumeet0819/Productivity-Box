import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import TodoPage from './pages/TodoPage'
import GoalsPage from './pages/GoalsPage'
import FinancePage from './pages/FinancePage'

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--on-surface)]">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path="/todo" element={
            <PrivateRoute>
              <TodoPage />
            </PrivateRoute>
          } />
          <Route path="/goals" element={
            <PrivateRoute>
              <GoalsPage />
            </PrivateRoute>
          } />
          <Route path="/finance" element={
            <PrivateRoute>
              <FinancePage />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App