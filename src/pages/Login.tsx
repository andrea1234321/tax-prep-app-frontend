import { Grid, GridContainer, Form, Fieldset, Label, TextInput, Button, Link} from '@trussworks/react-uswds'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    return ( 
        <>
            <main id="main-content">
                <div className="bg-base-lightest">
                    <GridContainer className="usa-section">
                        <Grid row={true} className="flex-justify-center">
                        <Grid col={12} tablet={{
                        col: 8
                        }} desktop={{
                        col: 6
                        }}>
                            <div className="bg-white padding-y-3 padding-x-5 border border-base-lighter">
                                <h1 className="margin-bottom-0">Sign in to</h1>
                                <Form onSubmit={() => {}}> {/* On submit, do nothing */}
                                    <Fieldset legend="Access your account" legendStyle="large">
                                    <Label htmlFor="email">Email address</Label>
                                    <TextInput id="email" name="email" type="email" autoCorrect="off" autoCapitalize="off" required={true} />

                                    <Label htmlFor="password-sign-in">Password</Label>
                                    <TextInput id="password-sign-in" name="password" type={showPassword ? 'text' : 'password'} autoCorrect="off" autoCapitalize="off" required={true} />

                                    <button title="Show password" type="button" className="usa-show-password" aria-controls="password-sign-in" onClick={(): void => setShowPassword(showPassword => !showPassword)}>
                                        {showPassword ? 'Hide password' : 'Show password'}
                                    </button>

                                    <Button type="submit">Sign in</Button>

                                    {/* <p>
                                        <Link href="javascript:void();">Forgot password?</Link>
                                    </p> */}
                                    </Fieldset>
                                </Form>
                            </div>

                            <p className="text-center">
                            {"Don't have an account? "}
                            <NavLink to='/signup'>Create your account now</NavLink>
                            </p>
                        </Grid>
                        </Grid>
                    </GridContainer>
                </div>
            </main>
        </>
    );
}
 
export default Login;
