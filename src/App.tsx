import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main'
import { AuthProvider } from './context/AuthContext';
import SellProduct from './components/SellProduct';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './components/Signup';
import LoginUser from './components/LoginUser';
const App = () => {

  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Main />} />
        <Route path="/login-user" element={<LoginUser />} />
        <Route element={<ProtectedRoute redirectTo="/" />}>
          <Route path="/sell" element={<SellProduct />} />
        </Route>
      </Routes>
    </Router>
  </AuthProvider>
  )
}

export default App;