/* eslint-disable react/prop-types */
import { UserContext } from "../components/context";

export const UserProvider = ({children}) => {

    // global state for app

    let usr={
        users:[{
          name:'Marco',
          email:'marco@mit.edu',
          password:'secret',
          balance:100
          }],
          currentUser:[],
          userHistory: {'Deposit':{},'Whitdraws:':{}},
          loggedIn: false
      };

    return(
        <UserContext.Provider value={usr}>
            {children}
        </UserContext.Provider>
    );
};
