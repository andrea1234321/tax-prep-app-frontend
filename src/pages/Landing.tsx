import { Button, GridContainer } from "@trussworks/react-uswds";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
interface UserInfo {
    name: string;
  }

const Landing = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

    useEffect(() => {
        fetch('http://localhost:8080/userInfo', {credentials: 'include', method: 'GET'})
            .then(data => data.json())     
            .then(userInfo => setUserInfo(userInfo))
            .catch(() => {
                console.log('error fetching user info') 
            })
    }, [])

    return (
        <>
            <main id="main-content">
                <GridContainer containerSize="mobile-lg">
                    {userInfo ? <h1 >Welcome {userInfo.name}</h1> : <h1 >Welcome</h1> }
                    <h2>It's time to file taxes</h2>
                    <Link to="/personalInformation"><Button type="button">File Tax Return</Button></Link>
                </GridContainer>
            </main>
        </>
    );
}

export default Landing;
