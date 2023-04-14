import * as React from 'react'; 
import { createContext, useContext, useState } from "react";

type Context = {
    user: string;
    setUser: React.Dispatch<React.SetStateAction<string>>;
};

export const UserContext = createContext<Context | null>({} as Context);

export const UserContextProv = ({children}: any) => {

    const [user , setUser] = useState<string>('BingChilling User ^^');

     return (
        <UserContext.Provider value={{user , setUser}}>
            {children}
        </UserContext.Provider>
     )
};

export const useUserCont = () => useContext(UserContext);

export default UserContextProv;