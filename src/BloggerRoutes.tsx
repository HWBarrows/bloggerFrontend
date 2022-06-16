import { Route, Routes } from 'react-router-dom';
import CreateNew from './components/createNew/CreateNew';
import LandingPage from './components/Landing/LandingPage';

export default function BloggerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/createNew" element={<CreateNew />} />
    </Routes>
  );
}
