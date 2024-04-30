import {
    Grid,
    Label,
    TextInput,
    DatePicker,
    TextInputMask,
} from "@trussworks/react-uswds";

const SpouseInfromation = () => {
    return (
        <>
            <h3>Spouse Information: </h3>
            <Grid row>
                <Grid col={6}>
                    <Label
                        htmlFor="spouse-first-name"
                        requiredMarker
                        id="spouse"
                    >
                        First Name
                    </Label>
                    <TextInput
                        id="spouse-first-name"
                        name="spouse-first-name"
                        type="text"
                        required
                    />
                </Grid>
                <Grid col={4} offset={2}>
                    <Label htmlFor="spouse-middle-initital" id="spouse">
                        Middle Initial
                    </Label>
                    <TextInput
                        id="spouse-middle-initital"
                        name="spouse-middle-initital"
                        type="text"
                    />
                </Grid>
            </Grid>
            <Label htmlFor="spouse-last-name" requiredMarker>
                Last Name
            </Label>
            <TextInput
                id="spouse-last-name"
                name="spouse-last-name"
                type="text"
                required
            />
            <Label
                htmlFor="spouse-date-of-birth"
                id="spouse-date-of-birth"
                requiredMarker
            >
                Date of Birth
            </Label>
            <DatePicker
                id="spouse-date-of-birth"
                name="spouse-date-of-birth"
                required
            />
            <Label htmlFor="ssn" requiredMarker>
                Social Security No.
            </Label>
            <TextInputMask
                id="input-type-ssn"
                name="input-type-ssn"
                type="text"
                mask="___-__-____"
                pattern="^(?!(000|666|9))\d{3} (?!00)\d{2} (?!0000)\d{4}$"
            />
            <br />
            <h3>Joint Financial information: </h3>
        </>
    );
};

export default SpouseInfromation;
