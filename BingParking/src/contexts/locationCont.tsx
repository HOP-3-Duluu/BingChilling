import { createContext, useContext, useState } from "react";

interface locationCont {
    fs: boolean;
    setFs: React.Dispatch<React.SetStateAction<boolean>>;
};

interface Props {
    children: React.ReactNode;
};

export const LocationContext = createContext<null | locationCont>({} as locationCont);

export const LocationContextProv = ({children}: Props) => {
    const [fs , setFs] = useState<boolean>(false);

    return (
        <LocationContext.Provider value={{fs , setFs}}>
             {children}
        </LocationContext.Provider>
    );
};

export const useLocationCont = () => useContext(LocationContext);

export default LocationContextProv;