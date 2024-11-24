import { Route, Routes as ReactRoutes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/navbar/Navbar"
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='App'>
          <Navbar />
          <ReactRoutes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </ReactRoutes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
