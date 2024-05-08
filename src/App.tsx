//npm modules
import "@trussworks/react-uswds/lib/index.css";
import "@trussworks/react-uswds/lib/uswds.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";


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
import FooterComp from "./components/FooterComp";

//stylesheets
import "./App.css";
import Admin from "./pages/Admin";


// App context
export type GlobalInfo = {
    isLoggedIn: boolean;
    isAdmin: boolean;
    isChanging: boolean;
    stepNumber: number;
};

export type UserInfo = {
    name: string;
    picture: string;
};

export type AdminAnalytics = {
    stateFrequencies: Record<string, number>;
    filingStatusFrequencies: Record<string, number>;
    incomeFrequencies: Record<string, number>;
};

export const backendUrl = "http://localhost:8080";

export const AppContext = createContext<[GlobalInfo, (g: (g: GlobalInfo) => GlobalInfo) => void]>([
    { isLoggedIn: true, isAdmin: true, isChanging: true, stepNumber: 1 },
    () => {},
]);

function App() {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [globalInfo, setGlobalInfo] = useState<GlobalInfo>({
        isLoggedIn: true,
        isAdmin: true,
        isChanging: true,
        stepNumber: 1,
    });
    const [adminAnalytics, setAdminAnalytics] = useState<AdminAnalytics>({
        stateFrequencies: {},
        filingStatusFrequencies: {},
        incomeFrequencies: {},
    });

    useEffect(() => {
        fetch(backendUrl + "/userInfo", {
            credentials: "include",
            method: "GET",
        })
            .then((data) => {
                if (data.ok) {
                    return data.json();
                }
                throw new Error();
            })
            .then((userInfo) => {
                setUserInfo({ name: userInfo.name, picture: userInfo.picture });
                fetch(backendUrl + "/admin/analytics", {
                    credentials: "include",
                    method: "GET",
                })
                    .then(data => {
                        if (data.ok) {
                            return data.json();
                        }
                        throw new Error();
                    })
                    .then(dataJson => setAdminAnalytics(dataJson))
                    .catch(() => {
                        setGlobalInfo(globalInfo => ({ ...globalInfo, isAdmin: false }));
                    });
            })
            .catch(() => {
                setGlobalInfo(globalInfo => ({ ...globalInfo, isLoggedIn: false, isAdmin: false }));
            })
            .finally(() => setGlobalInfo(globalInfo => ({ ...globalInfo, isChanging: false })));
    }, []);

    return (
        <>
            <AppContext.Provider value={[globalInfo, setGlobalInfo]}>
                <BrowserRouter basename="/">
                {!globalInfo.isChanging && globalInfo.isLoggedIn && <NavBar userInfo={userInfo} />}
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Login />
                            }
                            />
                        <Route path="/register" element={<Signup />} />
                        <Route
                            path="/home"
                            element={<Landing userInfo={userInfo} />}
                            />
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
                        <Route path="/admin" element={<Admin analytics={adminAnalytics}/>} />
                    </Routes>
                    {!globalInfo.isChanging && globalInfo.isLoggedIn && <FooterComp />}
                </BrowserRouter>
            </AppContext.Provider>
        </>
    );
}

export default App;
