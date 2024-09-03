import React from "react";
import axios from "axios";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = async () => {
        try{
            const response = await axios.post('http://localhost:3000/users/signup' , {username : username , password : password});
            console.log(response);
        } catch {
            console.log('Failed to register user.')
        }
    };

    return <div>
        <h1>Register to the website</h1>
        <br/>
        <form onSubmit={handleSubmit}>
            <label> Username :
            <input  type={"text"} 
                    onChange={(e) => setUsername(e.target.value)} 
                    value={username}
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
        Already a user? <a href="/login">Login</a>
    </div>
}

export default Register;