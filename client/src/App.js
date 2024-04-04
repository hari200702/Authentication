import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Fogotpassword from './components/Fogotpassword';
import Resetpassword from './components/Resetpasssword';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgotpassword" element={<Fogotpassword />} />
        <Route exact path="/resetpassword/:token" element={<Resetpassword />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
