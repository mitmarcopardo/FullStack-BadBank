/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { UserContext, Cards } from "./context";
import { Card, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';

export function Login(){
    const [show, setShow] = useState(false);
    const ctx = useContext(UserContext);
    const [showl, setShowl] = useState(ctx.loggedIn);
    const [status, setStatus] = useState(true);

    return(
        <>
            <Cards
                header="Login Page"
                status={status}
                body={show || ctx.loggedIn ? <LoginMsg setShow={setShow}/> : <LoginForm setShow={setShow} setStatus={setStatus}/>} 
            />
        </>
);
        
}

function LoginForm(props){
    const ctx = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState([]);
    const [move, setMove] = useState();
    const [datax, setData] = useState(null);
  
    async function handle(){
      const url = `http://localhost:3001/account/login/${email}`

      let handleLogin = await axios.get(url);
      //let data = handleLogin.data[0]
      ctx.currentUser = handleLogin.data[0]
      ctx.loggedIn = true;
      props.setShow(true);
    }

    async function loggedIn(){
      
      setTimeout(() => {
        if (!validateField(email,        'email'))       return;
        if (!validateField(password,     'password'))    return;
        if (validateUser(password)) return;
      }, 25);
      Search(email);
      
  }

  // - function to extrac all data from fecth / axios
  function validateUser(password){
    if(datax < 1){
      props.setStatus('User doesnt exist');
      setTimeout( () => props.setStatus(''),2000);
      return false
    }else if(datax[0].password != password){
      props.setStatus('incorrect password, try again');
      setTimeout( () => props.setStatus(''),2000);
      return false
    }else if(datax[0].password == password & datax[0].email == email){
     handle();
      return true
    }
  }

  function validateField(field, label){
      if (!field){
          props.setStatus('Error: ' + label , ' is empty ');
          setTimeout( () => props.setStatus(''),3000);
          return false;
      }
      return true;
  }

  // ------------ Search function for user
  function Search(email){
    const url = `http://localhost:3001/account/search/${email}`
    axios.get(url)
    .then(resp => {
      setData(resp.data)
    })
    .finally()
    return {datax}

    }

  
    return(
        <>    
            <Card.Text className='txt-body'>
            Email Address<br></br>
              <input type="email" className="from-control" id="email"
              placeholder="Enter email" value={email} onChange={ e => setEmail(e.currentTarget.value) }/>
              
              <p></p>Password<br></br>
              <input type="password" className="from-control" id="password"
              placeholder="Enter Password" value={password} onChange={ e => setPassword(e.currentTarget.value) }/>
  
              <p></p><button type="submit" className="btn btn-primary m-3" onMouseDown={loggedIn}>Login</button>
            </Card.Text>
          
    </>);
  }
  
  function LoginMsg(props){
    const ctx = useContext(UserContext);

    function logout(){
      props.setShow(false);
      ctx.loggedIn = false;
      ctx.currentUser = [];
    }
    
    return(
      <>
        <h5>Welcome {ctx.currentUser.name}</h5>
        <p/>
        <Button type='submit' className='btn btn-primary'
        onClick={ logout }>Log Out</Button>
    </>);
  }

export default Login