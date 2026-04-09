import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { AuthProvider } from './context/AuthContext'

import Home from './pages/Home'
import Signup from './pages/Signup'

import Dashboard from './pages/Dashboard'
import EditResume from './pages/EditResume'

import AuthLayout from './layout/AuthLayout'
import MainLayout from './layout/MainLayout'
import Login from './pages/Login'
import NotFound from './components/NotFound'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />

        <Routes>

          {/* 🔐 Auth Pages (NO Navbar/Footer) */}
          <Route 
            path="/signup" 
            element={
              
                <Signup />
          
            } 
          />

          <Route 
            path="/login" 
            element={
              
                <Login />
              
            } 
          />

          <Route 
            path="/resumes/:id" 
            element={
              <AuthLayout>
                <EditResume />
              </AuthLayout>
            } 
          />

          {/* 🌐 Main Pages (WITH Navbar/Footer) */}
          <Route 
            path="/" 
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            } 
          />

          <Route 
            path="/dashboard" 
            element={
              <MainLayout>
                <AuthLayout>
                  <Dashboard />
                </AuthLayout>
              </MainLayout>
            } 
          />
          <Route 
            path="*" 
            element={
              <NotFound />
              
            }
          />

        </Routes>

      </AuthProvider>
    </BrowserRouter>
  )
}

export default App