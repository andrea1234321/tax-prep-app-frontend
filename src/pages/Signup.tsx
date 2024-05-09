import {
    Grid,
    GridContainer,
    Form,
    Fieldset,
    Label,
    TextInput,
    Button,
} from "@trussworks/react-uswds";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { backendUrl } from "../App";

type UserData = {
    email: string;
    password: string;
    "password-confirm": string;
};

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form as HTMLFormElement);
        const formJson = Object.fromEntries(formData.entries()) as UserData;

        if (formJson.password !== formJson["password-confirm"]) {
            console.log("Passwords do not match!");
            return;
        }

        fetch(backendUrl + "/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formJson.email,
                password: formJson.password,
            }),
        })
            .then((data: Response) => {
                console.log(data);
                if (data.status === 201) {
                    console.log("User created.");
                }
            })
            .catch((error: Error) => console.error(error));
    };

    return (
        <>
            <main id="main-content">
                <div className="bg-base-lightest">
                    <GridContainer className="usa-section">
                        <Grid row={true} className="flex-justify-center">
                            <Grid
                                col={12}
                                mobileLg={{
                                    col: 10,
                                }}
                                tablet={{
                                    col: 8,
                                }}
                                desktop={{
                                    col: 6,
                                }}
                            >
                                <div className="bg-white padding-y-3 padding-x-5 border border-base-lighter">
                                    <Form onSubmit={handleSubmit}>
                                        <h1 className="margin-bottom-0">
                                            Create account
                                        </h1>
                                        <Fieldset legend="Get started with an account.">
                                            <p>
                                                <abbr
                                                    title="required"
                                                    className="usa-hint usa-hint--required"
                                                >
                                                    *
                                                </abbr>{" "}
                                                indicates a required field.
                                            </p>

                                            <Label htmlFor="email">
                                                Email address{" "}
                                                <abbr
                                                    title="required"
                                                    className="usa-label--required"
                                                >
                                                    *
                                                </abbr>
                                            </Label>
                                            <TextInput
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoCapitalize="off"
                                                autoCorrect="off"
                                                required={true}
                                            />

                                            <Label htmlFor="password-create-account">
                                                Create password{" "}
                                                <abbr
                                                    title="required"
                                                    className="usa-label--required"
                                                >
                                                    *
                                                </abbr>
                                            </Label>
                                            <TextInput
                                                id="password-create-account"
                                                name="password"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                autoCapitalize="off"
                                                autoCorrect="off"
                                                required={true}
                                            />

                                            <button
                                                title="Show password"
                                                type="button"
                                                className="usa-show-password"
                                                aria-controls="password-create-account password-create-account-confirm"
                                                onClick={(): void =>
                                                    setShowPassword(
                                                        (showPassword) =>
                                                            !showPassword,
                                                    )
                                                }
                                            >
                                                {showPassword
                                                    ? "Hide password"
                                                    : "Show password"}
                                            </button>

                                            <Label htmlFor="password-create-account-confirm">
                                                Re-type password{" "}
                                                <abbr
                                                    title="required"
                                                    className="usa-label--required"
                                                >
                                                    *
                                                </abbr>
                                            </Label>
                                            <TextInput
                                                id="password-create-account-confirm"
                                                name="password-confirm"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                autoCapitalize="off"
                                                autoCorrect="off"
                                                required={true}
                                            />

                                            {/* <Checkbox id="terms-and-conditions" name="terms-and-conditions" className="margin-y-3" required={true} label={checkboxLabel} /> */}

                                            <Button type="submit">
                                                Create account
                                            </Button>
                                        </Fieldset>
                                    </Form>
                                </div>

                                <p className="text-center">
                                    Already have an account?{" "}
                                    <NavLink to="/">Sign In</NavLink>
                                </p>
                            </Grid>
                        </Grid>
                    </GridContainer>
                </div>
            </main>
        </>
    );
};

export default Signup;
