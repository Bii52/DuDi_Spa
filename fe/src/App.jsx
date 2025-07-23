import './App.css';
import AppRoutes from './routes/Routes';
import Header from './components/Header';
import Footer from './components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const hideLayout = location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      // Clean the URL
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  return (
    <>
      {!hideLayout && <Header />}
      <main>
        <AppRoutes />
      </main>
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;
