import React from "react"
//Il prend en paramètre la forme de l'information que l'on souhaite passer


export default React.createContext({
    isAuthenticated:false,
    setIsAuthenticated:(value)=>{}
})