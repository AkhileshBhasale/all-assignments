import {useEffect , useState} from "react";
import { useNavigate } from 'react-router-dom';

function Landing() {
    const [loggedIn , setLoggedIn] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        let token = localStorage.getItem("jwtToken");
        if(token != null){
            setLoggedIn(true);
        }
    } , []);

    const handleLogOut = () => {
        localStorage.removeItem('jwtToken');
        navigate('/');
        setLoggedIn(false);
    }

    if(!loggedIn){
        return <LoggedOut/>
    }
    else{
        return <LoggedIn onLogout={handleLogOut}/>
    }
    
}

function LoggedOut() {
    return <div>
        <h1>Welcome to course selling website!</h1>
        <a href="/register">Register</a>
        <br/>
        <a href="/login">Login</a>
    </div>
}

function LoggedIn({onLogout}) {
    const handleLoggingOut = () => {
        onLogout();
    }
    return <div>
        <button onClick={handleLoggingOut}>
            LogOut
        </button>
        <br/>
    </div>
}

export default Landing;