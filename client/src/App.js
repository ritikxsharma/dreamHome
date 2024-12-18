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
import AdCreate from './pages/user/ad/AdCreate';
import PrivateRoute from './components/routes/PrivateRoute';
import SellHouse from './pages/user/ad/SellHouse';
import SellLand from './pages/user/ad/SellLand';
import RentHouse from './pages/user/ad/RentHouse';
import RentLand from './pages/user/ad/RentLand';

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

            <Route path="/" element={<PrivateRoute />}>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='ad/create' element={<AdCreate />} />
              <Route path='ad/create/sell/house' element={<SellHouse />} />
              <Route path='ad/create/sell/land' element={<SellLand />} />
              <Route path='ad/create/rent/house' element={<RentHouse />}/>
              <Route path='ad/create/rent/land' element={<RentLand />}/>
            </Route>

          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
