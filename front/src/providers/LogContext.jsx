import { createContext, useContext, useState } from "react";


const LogContext = createContext();

export const useLogContext= () =>
{
 const context = useContext(LogContext)

 if(!context){
    throw new Error('useLogContext must be used within a LogProvider');
 }
 return context;
};

export const LogProvider = ({ children }) =>{
    const [log,setLog] = useState(false);

    return(
        <LogContext.Provider value={
            {
                checklog:[log,setLog]
            }
        }>
            {children}
        </LogContext.Provider>
    )
};