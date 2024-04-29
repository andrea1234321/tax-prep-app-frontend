import ProgressBar from "../components/ProgressBar";
import { Fieldset, RequiredMarker, Form, Button } from "@trussworks/react-uswds";

const Review = () => {
    return (
        <>
            <main id="main-content">
                <ProgressBar stepNumber={3} />
                <Form onSubmit={() => {}} large>
                    <Fieldset legend="Review" legendStyle="large">
                    <p>
                        Required fields are marked with an asterisk (<RequiredMarker />).
                    </p>
                    <Button type="submit">Results</Button>
                    </Fieldset>
                </Form>
            </main>
        </>
    );
}

export default Review