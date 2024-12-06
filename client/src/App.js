import { BrowserRouter, Routes, Route } from 'react-router-dom'


import { AuthProvider } from './context/auth';
import { Toaster } from 'react-hot-toast'
import Main from './components/navigation/Main';

import Home from './pages/Home';
import Login from "./pages/Login";
import Register from "./pages/Register";
import AccountActivate from './pages/auth/AccountActivate';
import ForgotPassword from './pages/auth/ForgotPassword';
import AccessAccount from './pages/auth/AccessAccount';
import Dashboard from './pages/user/Dashboard';
import Sidebar from './components/navigation/Sidebar';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Main />
          <Toaster />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/auth/account-activate/:token' element={<AccountActivate />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/auth/access-account/:token' element={<AccessAccount />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
