import React from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{

            const response = await axios.post('http://localhost:3000/admin/login' , null ,{ headers: {
                username : email,
                password : password
            }});
            let token = response.data.token;
            console.log(response);
            localStorage.setItem('jwtToken', token);
            navigate('/create');
        } catch(err) {
            console.log(err)
        }
    };

    return <div>
        <h1>Login to admin dashboard</h1>
        <br/>
        <form onSubmit={handleSubmit}>
            <label> Username :
            <input  type={"text"} 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email}
                    required/>
            </label>
            <br/>
            <label> Password :
            <input  type={"password"} 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}
                    required/>
            </label>
            <br/>
            <button type={"submit"}>Submit</button>
        </form>
        <br/>
        New here? <a href="/register">Register</a>
    </div>
}

export default Login;