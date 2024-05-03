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

//stylesheets
import "./App.css";


// App context
type GlobalInfo = {
    isLoggedIn: boolean;
    stepNumber: number;
};

export type UserInfo = {
    name: string;
    picture: string;
};

export const AppContext = createContext<[GlobalInfo, (g: GlobalInfo) => void]>([
    { isLoggedIn: true, stepNumber: 1 },
    () => {},
]);

function App() {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [globalInfo, setGlobalInfo] = useState<GlobalInfo>({
        isLoggedIn: true,
        stepNumber: 1,
    });

    useEffect(() => {
        fetch("http://localhost:8080/helloWorld", {
            credentials: "include",
            method: "GET",
        })
            .then(data => {
                if (data.ok) {
                    handleAddUserInfo();
                } else {
                    setGlobalInfo({...globalInfo, isLoggedIn: false});
                }
            })
            .catch(() => setGlobalInfo({...globalInfo, isLoggedIn: false}));
    }, []);

    console.log("global info: ", globalInfo)

    const handleAddUserInfo = (): void => {
        fetch("http://localhost:8080/userInfo", {
            credentials: "include",
            method: "GET",
        })
            .then((data) => data.json())
            .then((userInfo) =>
                setUserInfo({ name: userInfo.name, picture: userInfo.picture }),
            )
            .catch(() => {
                console.log("error fetching user info");
            });
    };

    return (
        <>
            <AppContext.Provider value={[globalInfo, setGlobalInfo]}>
                {/* if signed in, add navbar */}
                <BrowserRouter basename="/">
                {globalInfo.isLoggedIn && <NavBar userInfo={userInfo} />}
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
                    </Routes>
                </BrowserRouter>
            </AppContext.Provider>
        </>
    );
}

export default App;
