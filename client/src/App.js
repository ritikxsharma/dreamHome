import { BrowserRouter, Routes, Route } from 'react-router-dom'


import { AuthProvider } from './context/auth';
import { Toaster } from 'react-hot-toast'
import Main from './components/navigation/Main';

import Home from './pages/Home';
import Login from "./pages/Login";
import Register from "./pages/Register";
import AccountActivate from './pages/auth/AccountActivate';

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
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
