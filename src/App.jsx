import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '/public/components/navbar.jsx'
import Container from 'react-bootstrap/Container';
import { Route, Routes } from 'react-router-dom';
import Home from '/public/components/home.jsx';
import CreateAccount from '../public/components/createaccount2.jsx';
import Login from '/public/components/login.jsx';
import Deposit from '/public/components/deposit.jsx';
import Withdraw from '/public/components/withdraw.jsx';
import Balance from '/public/components/balance.jsx';
import AllData from '/public/components/alldata.jsx';
import { UserProvider } from '/public/provider/UserProvider';


function App() {
  return (
    <>
    <UserProvider>
      <NavBar/>
      <Container className=''>
        <Routes>
          <Route path='/' index element={<Home/>}/>
          <Route path='/createaccount2' element={<CreateAccount/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/deposit' element={<Deposit/>}/>
          <Route path='/withdraw' element={<Withdraw/>}/>
          <Route path='/balance' element={<Balance/>}/>
          <Route path='/alldata' element={<AllData/>}/>
        </Routes>
      </Container>

    </UserProvider>
    </>
  )
}

export default App
