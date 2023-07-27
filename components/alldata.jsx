/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function AllData(){
    const [dataLocal, setDataLocal] = useState('');
    const [fetx, setFetch] = useState(0);
    const [toFetch, setToFetch] = useState(false);
    const [noData, setNoData] = useState(false);

    useEffect( () => {
        fetch('http://localhost:3001/account/all')
        .then(async response => {
            try{
                const data = await response.json()
                console.log(data);
                setDataLocal(JSON.stringify(data));
                if(data.length === 0) { 
                    setNoData(true);
                }else{
                    setNoData(false);
                }
              }catch(error){
                console.log('Error happened here!')
                console.error(error)
              }
        })
    }, [fetx]);



    return(
    <>
    <h1 className="mt-5"> AllData Page</h1>

    <button type="submit" className="btn btn-primary mt-3" onClick={ () => {setFetch(fetx + 1); setToFetch(true); setNoData(false);}}>Fetch Data</button>

    <Container className="mt-5">
    <Table striped bordered hover>
        <thead>
            <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Current Balance</th>
            <th>Permissions</th>
            </tr>
        </thead>
        <tbody>
            { toFetch ? ( noData ? (<PopUp noData={noData}/>) : <AfterFetch dataLocal={dataLocal} /> ) : ('')  }
        </tbody>
    </Table>
    </Container>
    
    </>);
}

function AfterFetch(props){
    return(
        <>
        { JSON.parse(props.dataLocal).map( (val, i) =>
            <tr key={i}>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.balance}</td>
                <td>{val.admin}</td>
            </tr>
        ) }
        </>
    )
}

function PopUp(props){
const [show, setShow] = useState(props.noData);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal className='text-center' show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title  className='text-center'>Alert!</Modal.Title>
        </Modal.Header>
        <Modal.Body>No user found, create an account to retrieve data</Modal.Body>
        <Modal.Footer className='justify-content-center '>
          <Button variant="primary" onClick={handleClose}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default AllData