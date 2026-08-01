import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavbarComponent from "./components/NavbarComponent";

import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";

import BQ1 from "./pages/BQ1";
import BQ2 from "./pages/BQ2";
import BQ3 from "./pages/BQ3";
import BQ4 from "./pages/BQ4";
import BQ5 from "./pages/BQ5";
import BQ6 from "./pages/BQ6";
import BQ7 from "./pages/BQ7";

function App() {

    return (

        <BrowserRouter>

            <NavbarComponent />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/about" element={<About />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/bq1" element={<BQ1 />} />

                <Route path="/bq2" element={<BQ2 />} />

                <Route path="/bq3" element={<BQ3 />} />

                <Route path="/bq4" element={<BQ4 />} />

                <Route path="/bq5" element={<BQ5 />} />

                <Route path="/bq6" element={<BQ6 />} />

                <Route path="/bq7" element={<BQ7 />} />

            </Routes>

        </BrowserRouter>

    );

}

export default App;
