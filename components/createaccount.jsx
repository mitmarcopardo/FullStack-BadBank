import { Card } from 'react-bootstrap'

function CreateAccount(){

    let variant = 'primary';

    return(
    <>
     <Card border = {`${variant}`} text='dark' className="text-center m-5 mx-auto primary">
          <Card.Header className='pb-5 display-6'>Welcome to BadBank App!</Card.Header>
          <Card.Body>
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text className='txt-body'>
                Name<br/>
                <input type="input" className="from-control" id="name"
                placeholder="Enter name" /><p/>
                
                Email Address<br/>
                <input type="input" className="from-control" id="email"
                placeholder="Enter email" /><p/>
               
                Password<br/>
                <input type="input" className="from-control" id="password"
                placeholder="Enter Password" /><p/>

                <button type="submit" className="btn btn-primary" >Create Account</button>

            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted mt-2">All rights reserved BadBank Enterprises LLC</Card.Footer>
        </Card>


      <Card 
            border = {`${variant}`}
            header = "Create Account"
            body = {
                <>

                <input type="input" className="from-control" id="email"
                placeholder="Enter email" value={'Mail'}  />


                
                
                Password<br/>
                <input type="input" className="from-control" id="password"
                placeholder="Enter Password" /><p/>
                <button type="submit" className="btn btn-light" >Create Account</button>
                </>
            }
        />



    </>);
}


export default CreateAccount