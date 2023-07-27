/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Cards, UserContext } from "./context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Modal, Spinner, Card } from "react-bootstrap";

function Balance() {
    const ctx = useContext(UserContext);
    const [datax, setData] = useState(null);
    const [bul, setBul] = useState(false);
    const [name, setName] = useState('');

            
    function Sear(){
            const url = `http://localhost:3001/account/balance/${ctx.currentUser.email}`
            axios.get(url)
            .then(resp => {
                setData(resp.data)
            })
            .finally()
            console.log(datax)
            return {datax}
    }

    useEffect( ()=>{
        setTimeout(() => {
            setBul(true);
            
        }, 3000);
        Sear();
        setBul(false);
        setName(ctx.currentUser.name)
    },[] )
    

    return(

            <Cards
                header={ bul ? ('Balance Page') : ('') } 
                body={ bul ? (
                    <Card.Text className='txt-body'>
                    Welcome {name}<br/>
                    <p>Your current balance is:</p>
                    <p>$ {datax[0].balance}</p>
                    </Card.Text>
                ) : (<LoadBalance/>)  }
                    
            />

    );
}

function LoadBalance(){

    return(
        <>
        <Modal.Header className='justify-content-center'>
                <Modal.Title>Fetching Data!</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center'>

            <Spinner animation="border" variant="primary" className="my-5 py-2"/>
            </Modal.Body>
        </>
    );
    }

export default Balance

