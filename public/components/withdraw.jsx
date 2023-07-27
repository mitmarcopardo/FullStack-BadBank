/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { UserContext, Cards } from "./context";
import { Card, Button } from "react-bootstrap";
import { useContext, useState } from "react";


function Withdraw(){
  const [amount, setAmount] = useState();
  const [show, setShow] = useState();
  const [status, setStatus] = useState('');
  const ctx = useContext(UserContext);
  const [balance, setBalance] = useState(ctx.currentUser.balance);

    
    
    return(
        <>
            <Cards
                header={ctx.loggedIn ? 'Transaction: Withdraw' : 'Login Page' } 
                status={status}
                body={<> Current Balance <br></br>${balance} <br></br>/-----------------------------/<br></br><WithdrawForm setBalance={setBalance} setStatus={setStatus}/> </>} 
            />
        </>
);
        
}
function WithdrawForm(props){
    const [amount, setAmount] = useState();
    const ctx = useContext(UserContext);

    
  
    function handle(){
      if(!validateField(amount, 'Amount'))  return;
      if(!validateFieldupper(amount))      return;

      const url = `http://localhost:3001/account/update/${ctx.currentUser.email}/${ctx.currentUser.balance}`;
      fetch(url)
      .then(response => response.json())
      .catch((error) => console.error("Error:", error));

    }

    function validateField(field, label){
      if (!field){
          props.setStatus('Error: ' + label + ' field is empty ');
          setTimeout( () => props.setStatus(''),3000);
          return false;
      }
      return true;
  }

    function validateFieldupper(field){
      if (field > 0 && field <= ctx.currentUser.balance ){
          props.setBalance(ctx.currentUser.balance = (JSON.parse(ctx.currentUser.balance)) - amount);
          props.setStatus('Money Withdrawn done!');
         // ctx.userHistory.Whitdraws[`${new Date().toUTCString().slice(5, 25)}`] = field;
          console.log(ctx.userHistory);
          setAmount(0)
          setTimeout( () => props.setStatus(''),1500);
          return true;}
      if (field == 0){
          props.setStatus('Error: an amount of 0 cant be withdrawn');
          setTimeout( () => props.setStatus(''),1500);
          return false;}
      if (field < 0){

          props.setStatus('Error: an amount lower than 0 cant be withdrawn');
          setTimeout( () => props.setStatus(''),1500);
       
        }

          return false;
        }



  
    return(
        <>    
            <Card.Text className='txt-body'>
              Amount<br/>
              $<input type="number" className="from-control text-center form-control-sm ms-2" id="amount"
              placeholder="Enter Amount" value={amount} onChange={ e => setAmount(parseFloat(e.currentTarget.value)) }/><p/>
  
              <button type="submit" className="btn btn-primary" onClick={handle} disabled={ ctx.currentUser.balance <= 0 ? (true) : (false) }>Withdraw</button>
            </Card.Text>
          
    </>);
  }
  
export default Withdraw