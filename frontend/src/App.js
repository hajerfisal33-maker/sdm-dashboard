import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavbarComponent from "./components/NavbarComponent";

// Main pages
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";

// Analytics pages
import GeographicalAndHistoricalDistribution from "./pages/GeographicalAndHistoricalDistribution";
import ClaimsAndMovementDuration from "./pages/ClaimsAndMovementDuration";
import SovereigntyDeclarations from "./pages/SovereigntyDeclarations";
import PatternsOfViolence from "./pages/PatternsOfViolence";
import GovernmentConcessions from "./pages/GovernmentConcessions";
import GovernmentRestrictions from "./pages/GovernmentRestrictions";
import GroupCharacteristics from "./pages/GroupCharacteristics";

// Exploration
import Globe from "./pages/Globe";

// Comparison
import ContinentComparison from "./pages/ContinentComparison";


function App() {

    return (

        <BrowserRouter>

            {/* Global Navigation */}
            <NavbarComponent />

            <Routes>

                {/* =========================
                    MAIN PAGES
                ========================= */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/about"
                    element={<About />}
                />


                {/* =========================
                    DATA ANALYTICS
                ========================= */}

                <Route
                    path="/bq1"
                    element={
                        <GeographicalAndHistoricalDistribution />
                    }
                />

                <Route
                    path="/bq2"
                    element={
                        <ClaimsAndMovementDuration />
                    }
                />

                <Route
                    path="/bq3"
                    element={
                        <SovereigntyDeclarations />
                    }
                />

                <Route
                    path="/bq4"
                    element={
                        <PatternsOfViolence />
                    }
                />

                <Route
                    path="/bq5"
                    element={
                        <GovernmentConcessions />
                    }
                />

                <Route
                    path="/bq6"
                    element={
                        <GovernmentRestrictions />
                    }
                />

                <Route
                    path="/bq7"
                    element={
                        <GroupCharacteristics />
                    }
                />


                {/* =========================
                    EXPLORATION
                ========================= */}

                <Route
                    path="/globe"
                    element={<Globe />}
                />


                {/* =========================
                    CONTINENT COMPARISON
                ========================= */}

                <Route
                    path="/continent-comparison"
                    element={<ContinentComparison />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;