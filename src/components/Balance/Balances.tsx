import { Balance } from 'components/Balance/Balance'
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from 'wagmi'
import { abi as crvAbi, address as crvAddress } from 'contracts/crv'
import { abi as sdcrvAbi, address as sdcrvAddress } from 'contracts/sdcrv'
import { abi as sdcrvgaugeAbi, address as sdcrvgaugeAddress } from 'contracts/sdcrv-gauge'
import { BalanceEthers } from './BalanceEthers'

export function Balances() {
  const { address, isConnected, connector } = useAccount()
  const { chain, chains } = useNetwork()
  const { data: balance } = useBalance({
    addressOrName: address,
  })
  return (
    <div className="flex w-1/4 flex-col">
      <h1 className="my-3 font-bold">My Position</h1>
      <div className="rounded-xl bg-sky-500/10 p-6 text-center">
        <Balance abi={crvAbi} address={address} contractAddress={crvAddress} functionName="balanceOf" tokenName="CRV" />
        <Balance
          abi={sdcrvAbi}
          address={address}
          contractAddress={sdcrvAddress}
          functionName="balanceOf"
          tokenName="sdCRV"
        />

        <BalanceEthers
          abi={sdcrvgaugeAbi}
          address={address}
          contractAddress={sdcrvgaugeAddress}
          functionName="balanceOf"
          tokenName="sdCRV-gauge"
        />
      </div>
    </div>
  )
}
