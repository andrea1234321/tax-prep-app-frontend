import { Button, Grid } from "@trussworks/react-uswds";

const Landing = () => {
    return (
        <>
            <main id="main-content">
                <Grid row={false} className="flex-justify-center">
                    <Grid col={12} tablet={{
                    col: 8
                    }} desktop={{
                    col: 6
                    }}>
                        {/* if name add after welcome, if not set yet, just say welcome */}
                        <h1 >Welcome</h1>
                        <h2>It's time to file taxes</h2>
                        <Button type="button">File Tax Return</Button>
                    </Grid>
                </Grid>
            </main>
        </>
    );
}
 
export default Landing;
