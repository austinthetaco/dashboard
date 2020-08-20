import React, { useEffect, useState } from 'react';

export const RootContext = React.createContext();

export default ({ children }) => {
  const prevAuthUser = JSON.parse(window.localStorage.getItem('currentUser')) || null;

  const [user, setAuthUser] = useState(prevAuthUser);
  useEffect(
    () => {
        console.log('user triggered',prevAuthUser); 
        console.log('user triggered22222',user); 
        console.log('equals', prevAuthUser === user)
        if(prevAuthUser !== user){
            window.localStorage.setItem('currentUser', JSON.stringify(user));
        }
    },
    [user, prevAuthUser]
  );


  const defaultContext = {
    user,
    setAuthUser
  };
  return (
    <RootContext.Provider value={defaultContext}>
      {children}
    </RootContext.Provider>
  );
};