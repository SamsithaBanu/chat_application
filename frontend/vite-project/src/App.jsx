import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/Navbar'
import { Homepage } from './pages/Homepage'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import ProfilePage from './pages/ProfilePage'
import { SettingPage } from './pages/SettingPage'
import { useEffect } from 'react';
import {Loader} from 'lucide-react';
import { useAuthStore } from './store/useAuthStore';
import Toaster from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'
import { ToastContainer } from 'react-toastify'

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <Homepage /> : <Navigate to='/login' />} />
        <Route path='/signup' element={!authUser ? <Signup /> :<Navigate to='/' />} />
        <Route path='/login' element={!authUser ? <Signin /> : <Navigate to='/'/>} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/login'/>} />
        {/* <Route path='/settings' element={<SettingPage />} /> */}
        <Route path='/settings' element={<div style={{margin:'100px'}}>Setting page on the way</div>} />
      </Routes>
      {/* <Toaster /> */}
    </div>
  )
}

export default App
