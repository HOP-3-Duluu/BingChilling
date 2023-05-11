import * as React from 'react';
import { useEffect } from 'react';
import { createContext, useContext, useState } from "react";
import { asyncStorage } from '../utils/aws';

type Context = {
    user: string;
    setUser: React.Dispatch<React.SetStateAction<string>>;
    isLogged: boolean;
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
    currentLocation: any;
    setCurrentLocation: React.Dispatch<any>;
};

export const UserContext = createContext<Context | null>({} as Context);

export const UserContextProv = ({ children }: any) => {
    const [currentLocation, setCurrentLocation] = useState<any | null>(null);
    const [user, setUser] = useState<any | null>(null);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    // const apiBaseUrl = process.env.TESTING;
    // console.log(apiBaseUrl);

    useEffect(() => {
        asyncStorage?.getItem('name').then((data) => setUser(data));
        if (user != null) {
            setIsLogged(true);
        }
        setIsLogged(true);
    }, [user]); 

    return (
        <UserContext.Provider value={{ user, setUser, isLogged, setIsLogged, currentLocation, setCurrentLocation }}>
            {children}
        </UserContext.Provider>
    )
};

export const useUserCont = () => useContext(UserContext);

export default UserContextProv; 