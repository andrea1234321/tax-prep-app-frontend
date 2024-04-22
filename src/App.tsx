//npm modules
import '@trussworks/react-uswds/lib/index.css'; 
import '@trussworks/react-uswds/lib/uswds.css';

//components
import NavBar from './components/NavBar';

//pages
import Login from './pages/Login';

//services

//stylesheets
import './App.css'

function App() {

    return (
        <>
            {/* if signed in, add navbar */}
            <NavBar />
            <Login/>
        </>
    )
}

export default App
