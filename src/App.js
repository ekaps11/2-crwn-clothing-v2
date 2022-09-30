import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/home/home.component';
import Authentication from './routes/authentication/authentication.component';

const App = () => (
  <Routes>
    <Route path="/" element={<Navigation />}>
      <Route index element={<Home />} />
      <Route path="shop" element={<h1>I am at the SHOP page</h1>} />
      <Route path="contact" element={<h1>I am at the CONTACT page</h1>} />
      <Route path="auth" element={<Authentication />} />
    </Route>
  </Routes>
);

export default App;
