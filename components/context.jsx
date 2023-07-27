/* eslint-disable react/prop-types */
import { Container, Card } from 'react-bootstrap';
import { createContext } from "react";



export const UserContext = createContext(null);

export function Cards(props){

    return(
        <>
        <Container className='mh-100 d-inline-block'>
            <Card text='dark' className="text-center m-5 mx-auto" border="secondary">
                <Card.Header className='pb-5 justify-content-center align-items-center display-6'>Welcome to BadBank App!</Card.Header>
                <Card.Title className='pt-3'>{props.header}</Card.Title>
                <Card.Body>

                    {props.body}
                    {props.status && (<Card.Text className="createStatus">{props.status}</Card.Text>)}
                </Card.Body>
            <Card.Footer className="text-muted pt-4">All rights reserved BadBank Enterprises LLC</Card.Footer>
            </Card>
        </Container>
        </>
    );
}

export default UserContext;