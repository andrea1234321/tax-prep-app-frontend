//npm modules
import '@trussworks/react-uswds/lib/index.css'; 
import '@trussworks/react-uswds/lib/uswds.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

//components
import NavBar from './components/NavBar';

//pages
import Login from './pages/Login';
import Signup from './pages/Signup';

//services

//stylesheets

function App() {

    return (
        <>
            {/* if signed in, add navbar */}
            <NavBar />
            <BrowserRouter basename='/'>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
