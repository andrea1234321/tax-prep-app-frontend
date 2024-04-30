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

const Results = () => {
    const [globalInfo, _] = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!globalInfo.isLoggedIn || globalInfo.stepNumber < 4) {
            navigate("/");
        }
    }, [globalInfo]);

    return (
        <>
            <main id="main-content">
                <ProgressBar stepNumber={4} />
                <Form onSubmit={() => {}} large>
                    <Fieldset legend="Results" legendStyle="large">
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

export default Results;
