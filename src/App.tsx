import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CryptoTablePage from './pages/crypto-table/CryptoTable';
import CryptoDetailsPage from './pages/crypto-details/CryptoDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CryptoTablePage />} />
        <Route path="/details/:id" element={<CryptoDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
