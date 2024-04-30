import { Button, GridContainer } from "@trussworks/react-uswds";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext, backendUrl } from "../App";
type UserInfo = {
    name: string;
};

const Landing = () => {
    const [globalInfo, _] = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!globalInfo.isLoggedIn) {
            navigate("/");
        }
    }, [globalInfo]);

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        fetch(backendUrl + "/userInfo", {
            credentials: "include",
            method: "GET",
        })
            .then((data) => data.json())
            .then((userInfo) => setUserInfo(userInfo))
            .catch(() => {
                console.log("error fetching user info");
            });
    }, []);

    return (
        <>
            <main id="main-content">
                <GridContainer containerSize="mobile-lg">
                    {userInfo ? (
                        <h1>Welcome {userInfo.name}</h1>
                    ) : (
                        <h1>Welcome</h1>
                    )}
                    <h2>It's time to file taxes</h2>
                    <Link to="/personalInformation">
                        <Button type="button">File Tax Return</Button>
                    </Link>
                </GridContainer>
            </main>
        </>
    );
};

export default Landing;
