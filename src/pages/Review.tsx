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
    const [globalInfo, _] = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!globalInfo.isLoggedIn || globalInfo.stepNumber < 3) {
            navigate("/");
        }
    }, [globalInfo]);

    return (
        <>
            <main id="main-content">
                <ProgressBar stepNumber={3} />
                <Form onSubmit={() => {}} large>
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
