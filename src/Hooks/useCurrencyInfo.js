import { useState,useEffect } from "react";

function useCurrencyInfo(currency){

    const [data,setData] = useState({});

    useEffect(()=>{
   
    const fetchData = async()=>{
          try{
           const response = await fetch(`https://v6.exchangerate-api.com/v6/b7cf1a0934a8cc83f65b58e4/latest/${currency}`)
            const data = await response.json();
            console.log("currency ki value "+currency)
            console.log("data ki value "+ JSON.stringify(data.conversion_rates))
               let val = data.conversion_rates;
            setData(val);
        }
    catch(err){
       console.log("there is error "+err)
    }
};
fetchData();

    },[currency]);

    return data;
}

export default useCurrencyInfo;