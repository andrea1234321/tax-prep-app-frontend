import { Header, Title } from "@trussworks/react-uswds";
import { UserInfo } from "../App";

type NavBarProps = {
    userInfo: UserInfo | null;
};

const NavBar = (props: NavBarProps) => {
    const { userInfo } = props;
    return (
        <>
            <Header basic={true}>
                <div className="usa-navbar">

                <Title className="text-left">
                    {/* <Link to="/home">Tax Return</Link> */}
                    Tax Return</Title>
                {userInfo && (
                    <img
                        src={userInfo.picture}
                        alt="profile-photo"
                    />
                )}
                </div>
            </Header>
        </>
    );
};

export default NavBar;
