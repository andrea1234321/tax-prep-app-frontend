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

//services

//stylesheets

function App() {
    const handleLogin= () => {
        window.location.replace("http://localhost:8080/signin");
        console.log("we signed in")
    }

    return (
        <>
            {/* if signed in, add navbar */}
            <NavBar />
            <BrowserRouter basename='/'>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Signup />} />
                    <Route path='/home' element={<Landing />} />
                </Routes>
            </BrowserRouter>
            <button onClick={handleLogin}>Click me</button>
        </>
    )
}

export default App
