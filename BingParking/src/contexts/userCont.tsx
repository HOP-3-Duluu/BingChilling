import * as React from 'react';
import { createContext, useContext, useState } from "react";

type Context = {
    slide: number;
    setSlide: React.Dispatch<React.SetStateAction<number>>;
    user: string;
    setUser: React.Dispatch<React.SetStateAction<string>>;
};

export const UserContext = createContext<Context | null>({} as Context);

export const UserContextProv = ({ children }: any) => {

    const [user, setUser] = useState<string>('BingChilling User ^^');
    const [slide, setSlide] = useState<number>(0);

    return (
        <UserContext.Provider value={{ user, setUser, slide, setSlide }}>
            {children}
        </UserContext.Provider>
    )
};

export const useUserCont = () => useContext(UserContext);

export default UserContextProv;