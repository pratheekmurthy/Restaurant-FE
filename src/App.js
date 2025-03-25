import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import MainLayout from './components/Mainlayout';
import KitchenDashboard from './components/KitchenDashobard';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/kitchen" element={<KitchenDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
