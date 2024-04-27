//npm modules
import '@trussworks/react-uswds/lib/index.css'; 
import '@trussworks/react-uswds/lib/uswds.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//components
import NavBar from './components/NavBar';

//pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import PersonalInfo from './pages/PersonalInfo';

//services

//stylesheets
import './App.css' 


function App() {
    return (
        <>
            {/* if signed in, add navbar */}
            <NavBar />
            <BrowserRouter basename='/'>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Signup />} />
                    <Route path='/home' element={<Landing />} />
                    <Route path='/personalInformation' element={<PersonalInfo />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
