import React, { createContext, useContext, useState } from "react";

interface locationCont {
    fs: boolean;
    setFs: React.Dispatch<React.SetStateAction<boolean>>;
    des: any;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setDes: React.Dispatch<any>;
    err: boolean;
    setErr: React.Dispatch<any>; 
    hasErr: any | boolean; 
    setHasErr: React.Dispatch<any | boolean>
};

interface Props {
    children: React.ReactNode;
};

export const LocationContext = createContext<null | locationCont>({} as locationCont);

export const LocationContextProv = ({children}: Props) => {
    const [fs , setFs] = useState<boolean>(false);
    const [name , setName] = useState<string>('');
    const [des, setDes] = useState<any | null>(null);
    const [err , setErr] = useState<any | boolean>(false);
    const [hasErr , setHasErr] = useState<any | boolean>(null);

    return (
        <LocationContext.Provider value={{fs , setFs, des , setDes , err , setErr , hasErr , setHasErr, name , setName}}>
             {children}
        </LocationContext.Provider>
    );
};

export const useLocationCont = () => useContext(LocationContext);

export default LocationContextProv;