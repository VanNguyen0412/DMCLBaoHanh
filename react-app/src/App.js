import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Login from './compoments/User/Login';
import BaoHanhOnline from './compoments/Customer/BaoHanhOnline';
import HomeCSKH from './compoments/Home/HomeCSKH';
import Home from './compoments/Home/Home';

function App() {
  return (
    <BrowserRouter>
    
      <Container>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/info-customer" element={<BaoHanhOnline />} />
          <Route path="/WR" element={<HomeCSKH />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
