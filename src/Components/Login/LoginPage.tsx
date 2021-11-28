import React, { useEffect, useState }  from "react";
import './Login.css'
import axios from "axios";
// const style={
//     display: "flex";
//     flex-direction:" column";
//     justifycontent: "space-around";
//     width: "100%"";
//     align-items: center;
// }
function LoginPage({checkAuthent}:{checkAuthent:(boolean)=>void}){
    const [checkAuth,setCheckAuth]=useState<boolean>(false)
    const [{username,password},setAuth]=useState({
        username:'',
        password:''
    })
    const Login=(e)=>{
e.preventDefault()
        axios.post("https://zones-backend-halan.herokuapp.com/login",{username,password}).then(
            response=>{
                // console.log(response.data.token)
                let token=response.data.token
                localStorage.setItem("Auth",`Bearer ${token}`)
                setCheckAuth(true)
                console.log("from login ",checkAuth)
                checkAuthent(checkAuth)
                window.location.reload()


            }
        )
    }
    useEffect(()=>{
        console.log(username,password)
        console.log("from login ",checkAuth)

    },[checkAuth])
    return(


<div className="center">
    <h1>Login</h1>
    <form className="container">
 <div className="txt_field">
 {/* <label htmlFor="userName">userName</label> */}
<input placeholder="UserName" required value={username} onChange={(event)=>setAuth({
    username:event.target.value,
    password
})}/>
 </div>

<div className="txt_field">
{/* <label htmlFor="password">passWord</label> */}
<input placeholder="PassWord"value={password} type="password" required onChange={(event)=>setAuth({
    username,
    password:event.target.value
})}/>

</div>
<button onClick={Login}>LogIn</button>


</form> 
</div>
        
    )

}
export default LoginPage