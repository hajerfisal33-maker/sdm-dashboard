import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavbarComponent from "./components/NavbarComponent";

import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";

import GeographicalAndHistoricalDistribution from "./pages/GeographicalAndHistoricalDistribution";
import ClaimsAndMovementDuration from "./pages/ClaimsAndMovementDuration";
import SovereigntyDeclarations from "./pages/SovereigntyDeclarations";
import PatternsOfViolence from "./pages/PatternsOfViolence";
import GovernmentConcessions from "./pages/GovernmentConcessions";
import GovernmentRestrictions from "./pages/GovernmentRestrictions";
import GroupCharacteristics from "./pages/GroupCharacteristics";
import Globe from "./pages/Globe";

function App() {

    return (

        <BrowserRouter>

            <NavbarComponent />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/about" element={<About />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/bq1" element={<GeographicalAndHistoricalDistribution />} />

                <Route path="/bq2" element={<ClaimsAndMovementDuration />} />

                <Route path="/bq3" element={<SovereigntyDeclarations />} />

                <Route path="/bq4" element={<PatternsOfViolence />} />

                <Route path="/bq5" element={<GovernmentConcessions />} />

                <Route path="/bq6" element={<GovernmentRestrictions />} />

                <Route path="/bq7" element={<GroupCharacteristics />} />

            </Routes>

        </BrowserRouter>

    );

}

export default App;
