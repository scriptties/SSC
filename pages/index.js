import { injected } from "@/components/wallet/connectors"
import { useWeb3React } from "@web3-react/core"
import { useState } from "react"
import TokenListRinkeby from "@/pages/token-list-rinkeby.json"



export default function Home() {
  const [selectedToken, setSelectToken] = useState(TokenListRinkeby[0])
  const { active, account, library, connector, activate, deactivate } = useWeb3React()

  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }

  const tokenAddress = '0xc8473d327ebc762D6B326e50190c292Ea7AFaA56'
  const tokenSymbol = 'SSC'
  const tokenDecimals = 18
  const tokenImage = 'https://i.postimg.cc/HxbMdqH2/SSC.png'

  async function addTokenFunction() {
    try {
      const wasAdded = await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
        type: 'ERC20',
        options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: tokenImage
        }
        }
      });

      if (wasAdded) {
        console.log('Thanks for your interest')
      } else {
        console.log('SSC token was not added')
      }
    } catch (error) {
      console.log(error)
    }

    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed')
    }
  }

  return (
    <center>
    <div>
    <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
    <button onClick={connect} class="button-3" role="button">Connect to MetaMask</button>&nbsp;&nbsp;
    <button onClick={disconnect} class="button-4" role="button">Disconnect</button>&nbsp;&nbsp;
    <a href='https://goerli.etherscan.io/token/0xc8473d327ebc762D6B326e50190c292Ea7AFaA56?a=0xc80d30b5c87619cd9523b0d145f3d16c8f72c4b6' target='_blank'><img class="SSC" src='https://i.postimg.cc/HxbMdqH2/SSC.png' border='0' alt='SSC'/></a><br></br><br></br>
    {active ? <span>Connected with <br></br><b>{account}</b></span> : <span>Not connected</span>}<br></br><br></br>
    <select onChange={(e) => setSelectToken(TokenListRinkeby[e.target.value])}>
      {TokenListRinkeby.map((token, index) => (
        <option value={index} key={token.address}>{token.name}</option>
      ))}
    </select><br></br><br></br>
    <button onClick={addTokenFunction}class="button-3">Add token to MetaMask</button>
    </div>
    </center>
  )
}
