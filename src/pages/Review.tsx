import { useContext, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";
import {
    Fieldset,
    RequiredMarker,
    Form,
    Button,
} from "@trussworks/react-uswds";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

const Review = () => {
    const [globalInfo, setGlobalInfo] = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!globalInfo.isLoggedIn || globalInfo.stepNumber < 3) {
            navigate("/");
        }
    }, [globalInfo]);

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (globalInfo.stepNumber < 4) {
            setGlobalInfo({...globalInfo, stepNumber: 4});
        }
        navigate("/results");
    };

    return (
        <>
            <main id="main-content">
                <ProgressBar stepNumber={3} />
                <Form onSubmit={handleSubmit} large>
                    <Fieldset legend="Review" legendStyle="large">
                        <p>
                            Required fields are marked with an asterisk (
                            <RequiredMarker />
                            ).
                        </p>
                        <Button type="submit">Results</Button>
                    </Fieldset>
                </Form>
            </main>
        </>
    );
};

export default Review;
