import Button from 'components/Buttons/Button'
import { abi as sdcrvAbi, address as sdcrvAddress } from 'contracts/sdcrv'
import { abi as sdcrvGaugeAbi, address as sdcrvGaugeAddress } from 'contracts/sdcrv-gauge'
import { ethers } from 'ethers'
import { useMemo, useRef, useState } from 'react'
import { useAccount, useContractRead, useContractWrite } from 'wagmi'

export function Stake() {
  const crvRef = useRef(null)
  const [stakeSdCRVAmount, setStakeSdCrvAmount] = useState(0)
  const { address } = useAccount()

  const { data, isError, isLoading } = useContractRead({
    addressOrName: sdcrvAddress,
    contractInterface: sdcrvAbi,
    functionName: 'balanceOf',
    args: [address],
  })

  const {
    data: allowanceValue,
    isError: approveAmountError,
    isLoading: approveAmountIsLoading,
  } = useContractRead({
    addressOrName: sdcrvAddress,
    contractInterface: sdcrvAbi,
    functionName: 'allowance',
    args: [address, sdcrvGaugeAddress],
  })

  const {
    data: exchangeData,
    isError: exchangeError,
    isLoading: exhangeLoading,
    write,
  } = useContractWrite({
    addressOrName: sdcrvGaugeAddress,
    contractInterface: sdcrvGaugeAbi,
    functionName: 'deposit',
  })

  const confirmStake = async () => {
    await write({
      args: [ethers.utils.parseEther(stakeSdCRVAmount.toString())],
    })
  }

  const balance = useMemo(
    () => (data !== undefined ? parseFloat(ethers.utils.formatEther(data)).toFixed(2) : 'Loading'),
    [data]
  )

  const isAllowed = useMemo(
    () => allowanceValue && allowanceValue.gt(stakeSdCRVAmount),
    [allowanceValue, stakeSdCRVAmount]
  )
  const enableBuyButton = useMemo(
    () => isAllowed && stakeSdCRVAmount > 0 && !exhangeLoading,
    [isAllowed, stakeSdCRVAmount, exhangeLoading]
  )

  const handleClickMax = () => {
    crvRef.current.value = balance
    setStakeSdCrvAmount(parseInt(balance))
  }

  return (
    <div className="flex flex-col p-20">
      <p className="mb-10 text-start"> Stake sdCRV</p>
      <div className="h-30 flex w-full flex-col items-end">
        <p className="my-1 text-xs">sdCRV Balance: {balance}</p>
        <div className="flex w-full flex-row">
          <input
            ref={crvRef}
            type="number"
            id="amount"
            className="w-full text-right"
            placeholder="Amount"
            required
            onChange={e => setStakeSdCrvAmount(parseInt(e.target.value))}
          />
          <button
            onClick={() => handleClickMax()}
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Max
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Button variant={isAllowed ? 'default' : 'primary'} disabled={approveAmountIsLoading || isAllowed}>
          {approveAmountIsLoading ? 'Waiting for tx...' : 'Approve pool for sdCRV'}
        </Button>
        <Button
          variant={enableBuyButton ? 'primary' : 'default'}
          disabled={!enableBuyButton}
          onClick={() => confirmStake()}
        >
          {exhangeLoading ? 'Waiting for tx...' : 'Stake sdCRV'}
        </Button>
      </div>
    </div>
  )
}
