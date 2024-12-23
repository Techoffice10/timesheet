import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './pages/Dashboard';
import { SchedulePage } from './pages/Schedule';
import { TimeClock } from './pages/TimeClock';

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/time-clock" element={<TimeClock />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;