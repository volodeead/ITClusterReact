import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Settings from './pages/Settings';
import Account from './pages/Account';
import News from './pages/News';
import Diagrams from './pages/Diagrams';
import Sidebar from './components/Sidebar'; // Ваше бокове меню

function App() {
  return (
    <Router>

      <Sidebar />

      <div className="content">
        <Routes>
          <Route path="/dashboard" element={<Diagrams />} />
          <Route path="/news" element={<News />} />
          <Route path="/account" element={<Account />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
