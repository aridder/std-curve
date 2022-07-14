import { ContractInterface, ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useProvider } from 'wagmi'

interface Props {
  tokenName: string
  abi: ContractInterface
  functionName: string
  contractAddress: string
  address: string
}

export function BalanceEthers({ tokenName, contractAddress, address }: Props) {
  const [balance, setBalance] = useState('Loading..')
  const provider = useProvider()
  useEffect(() => {
    const fetch = async () => {
      const contract = new ethers.Contract(
        contractAddress,
        ['function balanceOf(address) public view returns (uint256)'],
        provider
      )
      const res = await contract.balanceOf(address)
      const bal = parseFloat(ethers.utils.formatEther(res)).toFixed(2)
      setBalance(bal)
    }
    fetch()
  }, [address, contractAddress, provider, setBalance])

  return (
    <div className="flex flex-row justify-between">
      <strong>{tokenName}</strong>
      <p>{balance}</p>
    </div>
  )
}
