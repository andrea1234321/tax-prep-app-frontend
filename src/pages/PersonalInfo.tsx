import { useContext, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";
import {
    Fieldset,
    RequiredMarker,
    Label,
    TextInput,
    Select,
    Form,
    Button,
    Grid,
    DatePicker,
    TextInputMask,
} from "@trussworks/react-uswds";
import { AppContext, backendUrl } from "../App";
import { useNavigate } from "react-router-dom";

type PersonalInfoType = {
    "first-name": string;
    "middle-initial": string;
    "Last-name": string;
    birthdate: string;
    "mailing-address-1": string;
    "mailing-address-2": string;
    city: string;
    state: string;
    zip: string;
    "input-type-ssn": string;
};

const PersonalInfo = () => {
    const [globalInfo, _] = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!globalInfo.isLoggedIn) {
            navigate("/");
        }
    }, [globalInfo]);

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const form = evt.target;
        const formData = new FormData(form as HTMLFormElement);
        const formJson = Object.fromEntries(
            formData.entries(),
        ) as PersonalInfoType;
        const body = JSON.stringify({
            firstName: formJson["first-name"],
            middleInitial: formJson["middle-initial"],
            lastName: formJson["Last-name"],
            dateOfBirth: Number(formJson.birthdate.replace('-', '').replace('-', '')),
            address: formJson["mailing-address-1"],
            city: formJson.city,
            state: formJson.state,
            aptNumber: formJson["mailing-address-2"],
            zipCode: Number(formJson.zip),
            ssn: Number(formJson["input-type-ssn"].replace('-', '').replace('-', '')),
        });
        console.log(body);

        fetch(backendUrl + "/profile", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body,
        })
            .then((data: Response) => {
                if (data.ok) {
                    console.log("Post successful!");
                } else {
                    console.log("Post failed.");
                }
            })
            .catch((error: Error) => console.error(error));
    };
    
    return (
        <>
            <main id="main-content">
                <ProgressBar stepNumber={1} />
                <Form onSubmit={handleSubmit} large>
                    <Fieldset legend="Personal Information" legendStyle="large">
                        <p>
                            Required fields are marked with an asterisk (
                            <RequiredMarker />
                            ).
                        </p>
                        <Grid row>
                            <Grid col={6}>
                                <Label htmlFor="first-name" requiredMarker>
                                    First Name
                                </Label>
                                <TextInput
                                    id="first-name"
                                    name="first-name"
                                    type="text"
                                    required
                                />
                            </Grid>
                            <Grid col={4} offset={2}>
                                <Label htmlFor="middle-initital">
                                    Middle Initial
                                </Label>
                                <TextInput
                                    id="middle-initital"
                                    name="middle-initital"
                                    type="text"
                                />
                            </Grid>
                        </Grid>
                        <Label htmlFor="Last-name" requiredMarker>
                            Last Name
                        </Label>
                        <TextInput
                            id="Last-name"
                            name="Last-name"
                            type="text"
                            required
                        />
                        <Label
                            htmlFor="date-of-birth"
                            id="date-of-birth"
                            requiredMarker
                        >
                            Date of Birth
                        </Label>
                        <DatePicker id="birthdate" name="birthdate" required />
                        <Label htmlFor="mailing-address-1" requiredMarker>
                            Street address
                        </Label>
                        <TextInput
                            id="mailing-address-1"
                            name="mailing-address-1"
                            type="text"
                            required
                        />

                        <Label htmlFor="mailing-address-2">
                            Street address line 2
                        </Label>
                        <TextInput
                            id="mailing-address-2"
                            name="mailing-address-2"
                            type="text"
                        />
                        <Grid row>
                            <Grid col={6}>
                                <Label htmlFor="city" requiredMarker>
                                    City
                                </Label>
                                <TextInput
                                    id="city"
                                    name="city"
                                    type="text"
                                    required
                                />
                            </Grid>
                            <Grid col={4} offset={2}>
                                <Label htmlFor="state" requiredMarker>
                                    State
                                </Label>
                                <Select id="state" name="state" required>
                                    <option>- Select -</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">
                                        District of Columbia
                                    </option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                                </Select>
                            </Grid>
                        </Grid>
                        <Label htmlFor="zip" requiredMarker>
                            ZIP Code
                        </Label>
                        <TextInput
                            id="zip"
                            name="zip"
                            type="text"
                            inputSize="medium"
                            pattern="[\d]{5}(-[\d]{4})?"
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
                            pattern="^(?!(000|666|9))\d{3}-(?!00)\d{2}-(?!0000)\d{4}$"
                        />
                        <Button type="submit">Financial Information</Button>
                    </Fieldset>
                </Form>
            </main>
        </>
    );
};

export default PersonalInfo;
