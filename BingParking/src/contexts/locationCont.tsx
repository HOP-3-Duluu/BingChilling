import { createContext, useContext, useState } from "react";

interface locationCont {
    fs: boolean;
    setFs: React.Dispatch<React.SetStateAction<boolean>>;
    des: any;
    setDes: React.Dispatch<any>;
};

interface Props {
    children: React.ReactNode;
};

export const LocationContext = createContext<null | locationCont>({} as locationCont);

export const LocationContextProv = ({children}: Props) => {
    const [fs , setFs] = useState<boolean>(false);
    const [des, setDes] = useState<any | null>(null);

    return (
        <LocationContext.Provider value={{fs , setFs, des , setDes}}>
             {children}
        </LocationContext.Provider>
    );
};

export const useLocationCont = () => useContext(LocationContext);

export default LocationContextProv;