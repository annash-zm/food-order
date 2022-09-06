import { createContext, useState } from 'react'

const AppContext = createContext()

const GetContext = ({ children }) => {
    const [checkOut, setCheckOut] = useState(false)
    const [countItem, setCountItem] = useState(0)
    const [restoName, setRestoName] = useState("")
    const [harga, setHarga] = useState(0)
    const [tampungTotal, setTampungTotal] = useState(0)
    const [saveResto, setSaveResto] = useState([])

    const [tampungCari, setTampungCari] = useState([])

    const [darkTheme, setDarkTheme] = useState(false)
    const [refresh, setRefresh] = useState()

    const appContextValue = {
        setCheckOut,setCountItem,setRestoName,setHarga,countItem,harga,setTampungTotal,tampungTotal,setSaveResto,saveResto,checkOut,restoName,tampungCari,setTampungCari,darkTheme,setDarkTheme,refresh,setRefresh
      }

    return (
        <AppContext.Provider value={appContextValue}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext, GetContext}