import Button from 'components/Buttons/Button'
import { abi as sdcrvAbi, address as sdcrvAddress } from 'contracts/sdcrv'
import { abi as poolAbi, address as poolAddress } from 'contracts/crvsdcrvpool'
import { ethers } from 'ethers'
import { useMemo, useRef, useState } from 'react'
import { useAccount, useContractRead, useContractWrite } from 'wagmi'

interface Props {}

export function Sell() {
  const crvRef = useRef(null)
  const [spendSdCRVAmount, setspendSdCRVAmount] = useState(0)
  const { address } = useAccount()

  // get_dy is used to get estimated CRV for sdCRV
  // 0 is crv
  // 1 is sdcrv

  const { data: estimateSdCrvAmountForCrv } = useContractRead({
    addressOrName: poolAddress,
    contractInterface: poolAbi,
    functionName: 'get_dy',
    args: [1, 0, ethers.utils.parseEther(spendSdCRVAmount.toString())],
  })

  const { data } = useContractRead({
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
    args: [address, poolAddress],
  })

  // exchange sdCRV for CRV
  const {
    data: exchangeData,
    isError: exchangeError,
    isLoading: exhangeLoading,
    write,
  } = useContractWrite({
    addressOrName: poolAddress,
    contractInterface: poolAbi,
    functionName: 'exchange',
  })

  const confirm = async () => {
    await write({
      args: [1, 10, ethers.utils.parseEther(spendSdCRVAmount.toString()), ethers.utils.parseEther('0')],
    })
  }

  const sdCRVBalance = useMemo(
    () => (data !== undefined ? parseFloat(ethers.utils.formatEther(data)).toFixed(2) : 'Loading'),
    [data]
  )

  const isAllowed = useMemo(() => allowanceValue && allowanceValue.gt(data), [allowanceValue, data])

  const enableBuyButton = useMemo(
    () => isAllowed && spendSdCRVAmount > 0 && !exhangeLoading,
    [isAllowed, spendSdCRVAmount, exhangeLoading]
  )

  const handleClickMax = () => {
    crvRef.current.value = sdCRVBalance
    setspendSdCRVAmount(parseInt(sdCRVBalance))
  }

  return (
    <div className="flex flex-col p-20">
      <p className="mb-10 text-start"> Swap sdCRV to CRV</p>
      <div className="h-30 flex w-full flex-col items-end">
        <p className="my-1 text-xs">sdCRV Balance: {sdCRVBalance}</p>
        <div className="flex w-full flex-row">
          <input
            ref={crvRef}
            type="number"
            id="amount"
            className="w-full text-right "
            placeholder="Amount"
            required
            onChange={e => setspendSdCRVAmount(parseInt(e.target.value))}
          />
          <button
            onClick={() => handleClickMax()}
            className="w-1/5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Max
          </button>
        </div>
        {estimateSdCrvAmountForCrv && (
          <p className="my-1 text-xs">
            You will recieve approximatly{' '}
            {parseFloat(ethers.utils.formatEther(estimateSdCrvAmountForCrv?.toString())).toFixed(4)} CRV
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Button variant={isAllowed ? 'default' : 'primary'} disabled={approveAmountIsLoading || isAllowed}>
          {approveAmountIsLoading ? 'Waiting for tx...' : 'Approve pool for sdCRV'}
        </Button>
        <Button variant={enableBuyButton ? 'primary' : 'default'} disabled={!enableBuyButton} onClick={() => confirm()}>
          {exhangeLoading ? 'Waiting for tx...' : 'Sell sdCRV for CRV'}
        </Button>
      </div>
    </div>
  )
}
