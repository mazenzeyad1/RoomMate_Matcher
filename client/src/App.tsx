import { Route, Routes as ReactRoutes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/navbar/Navbar"
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='App'>
          <Navbar />
          <ReactRoutes>
            <Route path="/" element={<Home />} />
          </ReactRoutes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
