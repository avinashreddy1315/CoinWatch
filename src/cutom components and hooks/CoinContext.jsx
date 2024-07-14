import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';


const CoinContext = createContext();

export const CoinContextProvider = (props)=>{

    const [allCoin, setAllCoin] = useState([])
    const [currency, setCurrency] = useState(
        {name: "USD", symbol: "$", value: 'usd'}
    )
    const [tableDisplay, setTableDisplay] = useState(['Rnak', 'Coin', ])

    const [filter, setFilter] = useState('')
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('')
    const [userId, setUserId] = useState('')
    const [singlecoin, setSingleCoin] = useState()
    


    const fetchAllCoin = async()=>{
        const options = {
            headers: {
              accept: 'application/json',
              'x-cg-demo-api-key': 'CG-GLQ8rCZdg9eL6ZKn7VUUVbfC'
            }
          };
          let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.value}`;
        if (filter) {
            url += `&order=${filter}`;
        }
        if (search){
            url += `&ids=${search}`;
        }
        try {
           // console.log(url);
            setLoading(true);
            const response = await axios.get(url, options);
            setAllCoin(response.data);
            //console.log(response.data)
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
        
    }

    useEffect(() => {
        if(userId || currency){
            fetchAllCoin();
        }
        
        
        
    }, [currency, filter, search]);

    const contextValue = {allCoin, currency, setCurrency, loading, filter, setFilter, setSearch, setUserId}
    return(
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export const useCoin = () => useContext(CoinContext)