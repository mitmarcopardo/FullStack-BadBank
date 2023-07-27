/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card, Button } from 'react-bootstrap';
import { UserContext,  Cards } from './context';
import { useContext, useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function CreateAccount(){
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState(true);
  const [showModal, setShowModal] = useState(false);
    return(
    <>

      <Cards
        header="Create Account"
        status={status}
        body={show ? ( showModal ? ( <Popup setShow={setShow} setShowModal={setShowModal} /> ) : (<CreateForm setShow={setShow} setShowModal={setShowModal} setStatus={setStatus}/>) ) : ( <CreateMsg setShow={setShow} />)}
      />

    </>);
}

function CreateForm(props){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sudo, setSudo] = useState(false);
  const [count, setCount] = useState(1);
  const ctx = useContext(UserContext);
  const [validate, setValidate] = useState(false);
  const handleOnChange = () => {
    setCount(count + 1);
    console.log(count);
  };

  async function Handle(){
      props.setShowModal(true);
      const url = `http://localhost:3001/account/create/${name}/${email}/${password}/${!sudo}`
      fetch(url)
      .then(response => response.json())
      .catch((error) => console.error("Error:", error));
  }

  useEffect( () => {
    setSudo(!sudo);
  },[count])

  function loggedIn(){
    if (!validateField(name,        'name'))       return;
    if (!validateField(email,        'email'))       return;
    if (!validateField(password,     'password'))    return;
    if (pwLength(password.length,     'password'))    return;
    Search(email)
    
  }

  function Search(email){

    const url = `http://localhost:3001/account/search/${email}`

      fetch(url)
      .then( async response => {
        try{
          const data =  await response.json();
          if(data.length < 1) { 
            setValidate(true);
              return  true;
          }else{
            props.setStatus('Error: User already exist ( Email )');
            setTimeout( () => props.setStatus(' '),3000);
            return false;
            }
        }catch(error){
            console.log('Error happened here!')
            console.error(error)
            return false;
          }
    }).catch( e => console.log(e));

/*
    then( () => console.log('Database Online'))
    .catch( e => console.log(e));
*/

  }

  function validateField(field, label){
    Search(email);
    if (!field){
        props.setStatus('Error: ' + label);
        setTimeout( () => props.setStatus(''),3000);
        return false;
    }
    return true;
  }

  function pwLength(field, label){
    if (field < 8){
      props.setStatus('Error: ' + label + ' is not longer that 8 characters ');
      setTimeout( () => props.setStatus(''),3000);
        return true;
    }
    return false;
  }


return(
    <>
      
        <Card.Text className='txt-body'>
          Name<br/>
          <input type="input" className="from-control" id="name"
          placeholder="Enter name" value={name} onChange={ e => setName(e.currentTarget.value) }/><p/>
          
          Email Address<br/>
          <input type="email" className="from-control" id="email"
          placeholder="Enter email" value={email} onChange={ e => setEmail(e.currentTarget.value) }/><p/>
          
          Password<br/>
          <input type="password" className="from-control" id="password"
          placeholder="Enter Password" value={password} onChange={ e => setPassword(e.currentTarget.value) }/><p/>

          Super User
                <Form.Check className='d-flex mx-auto mb-4 justify-content-center text-center' // prettier-ignore
                  type="switch"
                  id="custom-switch"
                  checked={count % 2  === 0  ? (true) : (false)}
                  onChange={ handleOnChange }
                />

          
          <button type="submit" className="btn btn-primary" onMouseDown={() => {
            loggedIn();
            validate ? (Handle()) : ('');
            }}>Create</button>
        </Card.Text>
      
</>);
}

function CreateMsg(props){
  return(
    <>
      <h5>Success</h5>
      <p/>
      <Button type='submit' className='btn btn-primary'
      onClick={ () => props.setShow(true)}>Add another account</Button>
  </>);
}

function Popup(props) {
  const [show, setShow] = useState(true);

  return (
    <>
      <Modal  className='justify-content-center' show={show} onHide={setTimeout(() => {
                                  setShow(false);
                                  props.setShowModal(false);
                                  props.setShow(false);
                                  }, 5000)} animation={true}>
        <Modal.Header className='justify-content-center'>
          <Modal.Title>Creating Account!</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <Spinner animation="border" variant="primary" />
          </Modal.Body>
        <Modal.Footer className='text-center justify-content-center'>
          We are setting everything up!<br/>
          This may take few seconds
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default CreateAccount