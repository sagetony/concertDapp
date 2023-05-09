import { ethers } from "ethers";
import DavidoConcertAbi from "../src/abis/contractsData/DavidoConcert.json";
import DavidoConcertAddress from "../src/abis/contractsData/DavidoConcert-address.json";

import Header from "./components/Header";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [account, setAccount] = useState(null);
  const [davidoconcert, setDavidoConcert] = useState(null);

  const WebHandler = useCallback(async () => {
    // get the account in metamask

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    // Get the provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Get Signer
    const signer = provider.getSigner();

    // Helps Changes account when user switch accounts
    window.ethereum.on("accountsChanged", async function (accounts) {
      setAccount(account[0]);
      await WebHandler();
    });

    // get contracts
    const davidoconcertcontract = new ethers.Contract(
      DavidoConcertAddress.address,
      DavidoConcertAbi.abi,
      signer
    );
    setDavidoConcert(davidoconcertcontract);
  }, [account]);

  useEffect(() => {
    WebHandler();
  }, [WebHandler]);

  return (
    <div>
      <Header WebHandler={WebHandler} account={account} />
      <Banner davidoconcert={davidoconcert} />
      <Footer />
    </div>
  );
}

export default App;
