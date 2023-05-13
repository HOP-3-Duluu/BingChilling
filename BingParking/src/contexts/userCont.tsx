import * as React from 'react';
import { useEffect } from 'react';
import { createContext, useContext, useState } from "react";
import { asyncStorage } from '../utils/aws';

type Context = {
    user: string;
    setUser: React.Dispatch<React.SetStateAction<string>>;
    isLogged: boolean;
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserContext = createContext<Context | null>({} as Context);

export const UserContextProv = ({children}: any) => {

    const [user, setUser] = useState<any | null>(null);
    const [isLogged , setIsLogged] = useState<boolean>(false);
    // const apiBaseUrl = process.env.TESTING;
    // console.log(apiBaseUrl);
    
    useEffect(() => {
        asyncStorage?.getItem('name').then((data) => setUser(data));
        if(user != null) {
           setIsLogged(true);
        }
        setIsLogged(false);
    }, [user]); 

    return (
        <UserContext.Provider value={{ user, setUser, isLogged , setIsLogged}}>
            {children}
        </UserContext.Provider>
    )
};

export const useUserCont = () => useContext(UserContext);

export default UserContextProv; 