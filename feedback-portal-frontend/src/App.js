import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FeedbackForm from './FeedbackForm';
import AdminPanel from './AdminPanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FeedbackForm />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
