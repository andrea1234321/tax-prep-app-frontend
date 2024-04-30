import { Button, GridContainer } from "@trussworks/react-uswds";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { UserInfo } from "../App";

type LandingProps = {
    userInfo: UserInfo | null;
};

const Landing = (props: LandingProps) => {
    const { userInfo } = props;
    const [globalInfo, _] = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!globalInfo.isLoggedIn) {
            navigate("/");
        }
    }, [globalInfo]);

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
