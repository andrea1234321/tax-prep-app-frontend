import ProgressBar from "../components/ProgressBar";
import { Fieldset, RequiredMarker, Label, TextInput, Form, Button } from "@trussworks/react-uswds";

const FinanceInfo = () => {
    return (
        <>
            <main id="main-content">
                <ProgressBar stepNumber={2} />
                <Form onSubmit={() => {}} large>
                    <Fieldset legend="Financial Information" legendStyle="large">
                    <p>
                        Required fields are marked with an asterisk (<RequiredMarker />).
                    </p>
                    <Label htmlFor="w2-income" requiredMarker>W2 Form(s) total income</Label>
                    <TextInput id="w2-income" name="w2-income" type="text" required/>
                    <Label htmlFor="other-income" requiredMarker>Other income</Label>
                    <TextInput id="other-income" name="other-income" type="text" required/>
                    <Label htmlFor="w2-tax-withheld" requiredMarker>W2 Form(s) total income tax withheld</Label>
                    <TextInput id="w2-tax-withheld" name="w2-tax-withheld" type="text" required/>
                    <Label htmlFor="tax-withheld-1099" requiredMarker>1099 Form(s) total income tax withheld</Label>
                    <TextInput id="tax-withheld-1099" name="tax-withheld-1099" type="text" required/>
                    <Label htmlFor="other-tax-withheld" requiredMarker>Other tax withheld</Label>
                    <TextInput id="other-tax-withheld" name="other-tax-withheld" type="text" required/>
                    <Label htmlFor="paid-taxes-withheld" requiredMarker>Paid taxes from 2022</Label>
                    <TextInput id="paid-taxes-withheld" name="paid-taxes-withheld" type="text" required/>
                    <Button type="submit">Review</Button>
                    </Fieldset>
                </Form>
            </main>
        </>
    );
}

export default FinanceInfo