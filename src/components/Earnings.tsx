import axios from 'axios'
import { ContractInterface } from 'ethers'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

interface Props {
  tokenName: string
  abi: ContractInterface
  functionName: string
  contractAddress: string
  address: string
}

export function Earnings() {
  const { address, isConnected, connector } = useAccount()
  const [earnings, setEarnings] = useState<string>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const res = await axios.post(`https://lockers.stakedao.org/api/lockers/${address}`)
      console.log('res', res)
      setEarnings(res.data)
      setLoading(false)
    }
    fetch()
  }, [address])

  // useEffect(() => {
  //   const fetch = async () => {
  //     const contract = new ethers.Contract(
  //       contractAddress,
  //       ['function balanceOf(address) public view returns (uint256)'],
  //       provider
  //     )
  //     const res = await contract.balanceOf(address)
  //     const bal = parseFloat(ethers.utils.formatEther(res)).toFixed(2)
  //     setBalance(bal)
  //   }
  //   fetch()
  // }, [address, contractAddress, provider, setBalance])

  if (loading) return <p>Loading</p>

  return <div className="flex flex-row justify-between">{<p>{earnings?.toString()}</p>}</div>
}
