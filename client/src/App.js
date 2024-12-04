import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home';
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from './context/auth';
import Main from './components/navigation/Main';

function App() {
  return (
    <>
      <BrowserRouter>
      <Main />
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
