import { Grid, GridContainer, Form, Fieldset, Label, TextInput, Button} from '@trussworks/react-uswds'
import { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';

const Login = () => {
    // Get global info
    const [globalInfo, setGlobalInfo] = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (globalInfo.isLoggedIn) {
            navigate('/home');
        }
    }, [globalInfo]);

    const [showPassword, setShowPassword] = useState(false);
    const googleClientId= import.meta.env.VITE_GOOGLE_CLIENT_ID;
    type UserData = {
        email: string,
        password: string
    }
    
    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        const backendUrl = 'http://localhost:8080'
        evt.preventDefault()
        const form = evt.target;
        const formData = new FormData(form as HTMLFormElement);
        const formJson = Object.fromEntries(formData.entries()) as UserData;

        fetch(backendUrl + '/login', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body : 'username=' + encodeURIComponent(formJson.email) + '&password=' + encodeURIComponent(formJson.password)
        })
        .then((data: Response) => {
            console.log(data);
            if (data.status === 200) {
                console.log("User Accepted.");
                setGlobalInfo({...globalInfo, isLoggedIn: true});
            }else{
                console.log("user rejected")
            }
        })
        .catch((error: Error) => console.error(error));
    };
    function handleCredentialResponse(response: any){
        console.log("Encoded JWT: ", response.credential)
        setGlobalInfo({...globalInfo, isLoggedIn: true})
    }


    useEffect(()=> {
        /* global google */
        google.accounts.id.initialize({
            client_id: googleClientId,
            callback: handleCredentialResponse
        })

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large"}
        )
    }, [])


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
                                <Form onSubmit={handleSubmit}>
                                    <Fieldset legend="Access your account" legendStyle="large">
                                    <Label htmlFor="email">Email address</Label>
                                    <TextInput id="email" name="email" type="email" autoCorrect="off" autoCapitalize="off" required={true} />

                                    <Label htmlFor="password-sign-in">Password</Label>
                                    <TextInput id="password-sign-in" name="password" type={showPassword ? 'text' : 'password'} autoCorrect="off" autoCapitalize="off" required={true} />

                                    <button title="Show password" type="button" className="usa-show-password" aria-controls="password-sign-in" onClick={(): void => setShowPassword(showPassword => !showPassword)}>
                                        {showPassword ? 'Hide password' : 'Show password'}
                                    </button>

                                    <Button type="submit">Sign in</Button>
                                    <p>or</p>
                                    <div id="signInDiv"></div>
                                    </Fieldset>
                                </Form>
                            </div>

                            <p className="text-center">
                            {"Don't have an account? "}
                            <NavLink to='/register'>Create your account now</NavLink>
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
