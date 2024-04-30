//npm modules
import "@trussworks/react-uswds/lib/index.css";
import "@trussworks/react-uswds/lib/uswds.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//components
import NavBar from "./components/NavBar";

//pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import PersonalInfo from "./pages/PersonalInfo";
import FinanceInfo from "./pages/FinanceInfo";
import Review from "./pages/Review";
import Results from "./pages/Results";

//services

//stylesheets
import "./App.css";
import { createContext, useState } from "react";

// App context
type GlobalInfo = {
    isLoggedIn: boolean;
    stepNumber: number;
};

export const backendUrl = "http://localhost:8080";

export const AppContext = createContext<[GlobalInfo, (g: GlobalInfo) => void]>([
    { isLoggedIn: false, stepNumber: 1 },
    () => {},
]);

function App() {
    const [globalInfo, setGlobalInfo] = useState<GlobalInfo>({
        isLoggedIn: false,
        stepNumber: 1,
    });

    return (
        <>
            <AppContext.Provider value={[globalInfo, setGlobalInfo]}>
                <BrowserRouter basename="/">
                    {/* if signed in, add navbar */}
                    {globalInfo.isLoggedIn && <NavBar />}
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Signup />} />
                        <Route path="/home" element={<Landing />} />
                        <Route
                            path="/personalInformation"
                            element={<PersonalInfo />}
                        />
                        <Route
                            path="/financialInformation"
                            element={<FinanceInfo />}
                        />
                        <Route path="/review" element={<Review />} />
                        <Route path="/results" element={<Results />} />
                    </Routes>
                </BrowserRouter>
            </AppContext.Provider>
        </>
    );
}

export default App;
