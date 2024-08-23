import React, { useState ,useEffect} from "react";
import InputBox from "./Components/InputBox";
import useCurrencyInfo from "./Hooks/useCurrencyInfo";

function App() {
  let BackgroundImage = `https://media.istockphoto.com/id/1226985345/photo/circuit-board-blue-computer-data-technology-artificial-intelligence.webp?b=1&s=612x612&w=0&k=20&c=Eqkx4Lp50ibFz-SFMzJ503SuS770AojqJPFt2Inc6u0=`;

  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("USD");
 
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const currencyInfo = useCurrencyInfo(from);
  //const currencyInfoTo = useCurrencyInfo(to);

  // Extract currency options

  // Convert amount based on 'from' and 'to' currencies
  useEffect(() => {
    if (currencyInfo[to] && amount) {
      setConvertedAmount(amount * currencyInfo[to]);
    }
  }, [amount, from, to, currencyInfo]);

  const options = Object.keys(currencyInfo);
  
const swap = ()=>{
  setTo(from);
  setFrom(to);
  setAmount(convertedAmount);
  setConvertedAmount(amount);
}
  const convert = () => {
    setConvertedAmount(amount*currencyInfo[to]);
  };

const clearAll = ()=>{
setAmount(0);
setConvertedAmount(0);
  }
  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('${BackgroundImage}')`,
      }}>
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}>
            <div className="w-full mb-1">
              <InputBox label="From"
              amount = {amount}
              currencyOptions={options}
              onCurrencyChange={(currency)=>setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amount)=>setAmount(amount)} />
            </div>
            <div className="relative w-full h-0.5">
              <button onClick = {swap} type="button" className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5">
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox label="To"
              amount = {convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency)=>setTo(currency)}
              selectCurrency={to} 
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert{"  "+from.toUpperCase()+"  "} to {"  "+to.toUpperCase()}
            </button>
            <button onClick={clearAll} type="submit" className="w-full bg-red-600 text-white mt-3 px-4 py-3 rounded-lg">
              Clear
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
