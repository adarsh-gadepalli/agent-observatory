import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Builder from './pages/Builder';
import Simulation from './pages/Simulation';
import Scenarios from './pages/Scenarios';
import Learning from './pages/Learning';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/scenarios" element={<Scenarios />} />
          <Route path="/learning" element={<Learning />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
