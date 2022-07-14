import { ContractInterface, ethers } from 'ethers'
import { useContractRead } from 'wagmi'

interface Props {
  tokenName: string
  abi: ContractInterface
  functionName: string
  contractAddress: string
  address: string
}

export function Balance({ tokenName, abi, functionName, contractAddress, address }: Props) {
  const { data, isError, isLoading } = useContractRead({
    addressOrName: contractAddress,
    contractInterface: abi,
    functionName: functionName,
    args: [address],
  })

  const balance = data !== undefined ? parseFloat(ethers.utils.formatEther(data)).toFixed(2) : 'Loading'

  return (
    <div className="flex flex-row justify-between">
      <strong>{tokenName}</strong>
      <p>{balance}</p>
    </div>
  )
}
