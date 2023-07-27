/* eslint-disable react/no-unescaped-entities */

import imgbank from '/assets/imgs/bank.png';
//import imgbank from '../assets/imgs/bank.png';
import { Card, Ratio, Image } from 'react-bootstrap';
import { Cards } from './context';

function Home() {
    return(
        <>
            <Cards
                header="Serving our customers and communities"
                status=""
                body={body()} 
            />
        </>
);
        
}

function body(){
    return(
        <>
            <Card.Text className='txt-body'>
                It doesn't happen with one transaction, in one day on the job, or in one quarter. It's earned relationship by relationship.
            </Card.Text>
            <div style={{ width: 200, height: 'auto' }} className='mx-auto my-3'>
                <Ratio aspectRatio="1x1">
                <Image src={`${imgbank}`} rounded />
                </Ratio>
                </div>
            <Card.Text>
                Create an Account or login to move forward!
            </Card.Text>
    </>);
}

export default Home