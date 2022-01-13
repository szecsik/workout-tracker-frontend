import React,{useState} from 'react';

const Login = () =>{

const [username, setUsername] = useState(null);
const [password, setPassword] = useState(null);

const checkLogin = async (e) =>{
console.log(username, password)
e.preventDefault();
try{
  const doLogin = await fetch('http://localhost:8080/signin', {method:'POST',headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({username:username, password:password})})
      const resp = await doLogin.json();
      window.localStorage.setItem("token", resp.token)
      window.location.href='/user'
}catch(e){
  alert("Login failed")
}



}

  return <form onSubmit={(e)=>{checkLogin(e)}}>

<label for="username">Username</label>
<input type="text" name="username" onInput={(e)=>{setUsername(e.target.value)}}></input>

<label for="password">Password</label>
<input type="password" name="password" onInput={(e)=>{setPassword(e.target.value)}}></input>

<button type="submit">Login</button>
  </form>
}

export default Login;
