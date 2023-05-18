import * as React from 'react';
import { useEffect } from 'react';
import { createContext, useContext, useState } from "react";
import { asyncStorage } from '../utils/aws';
import AWSAPI from '../utils/api';

type Context = {
    user: any;
    setUser: React.Dispatch<any>;
    isLogged: boolean;
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
    currentLocation: any;
    setCurrentLocation: React.Dispatch<any>;
};

export const UserContext = createContext<Context | null>({} as Context);

export const UserContextProv = ({ children }: any) => {
    const [currentLocation, setCurrentLocation] = useState<any | null>(null);
    const [user, setUser] = useState<any | null>(null);
    const [isLogged , setIsLogged] = useState<boolean>(false);
    
    useEffect(() => {
        asyncStorage?.getItem('name').then(async(name) => {
            if(name) {
                await AWSAPI.get(`user/get/gantur`).then((res) => {
                    if(res?.data?.data) {
                        console.log(res?.data?.data);
                        setUser(res?.data?.data); 
                        setIsLogged(true);
                    }
                    else {
                        setIsLogged(false);
                    };
                });
            }
            else {
                setIsLogged(false);
            };
        });
    }, [AWSAPI , asyncStorage]); 

    return (
        <UserContext.Provider value={{ user, setUser, isLogged, setIsLogged, currentLocation, setCurrentLocation }}>
            {children}
        </UserContext.Provider>
    )
};

export const useUserCont = () => useContext(UserContext);

export default UserContextProv; 