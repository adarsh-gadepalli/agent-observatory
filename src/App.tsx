import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Simulation from './pages/Simulation';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/simulation" element={<Simulation />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
