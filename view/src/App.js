import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LayoutPage } from './pages/LayoutPage';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AccountPage } from './pages/AccountPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LayoutPage />}>
          <Route index element={<HomePage />}/>
          <Route path='products' element={<ProductsPage />}/>
          <Route path='login' element={<LoginPage />}/>
          <Route path='register' element={<RegisterPage />}/>
          <Route path='account' element={<AccountPage />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
