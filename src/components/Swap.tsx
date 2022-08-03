import Button from 'components/Buttons/Button'
import { Pool__factory } from 'contracts/typechain'
import { abi as poolAbi, address as poolAddress } from 'contracts/crvsdcrvpool'
import { ethers } from 'ethers'
import { useAllowance } from 'hooks/useAllowance'
import { useBalanceOf } from 'hooks/useBalance'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useAccount, useContractRead, useContractWrite, useSigner } from 'wagmi'

type Token = {
  name: string
  id: number
  address: string
}

interface Props {
  title: string
  helperTitle: string
  helperText: string
  fromToken: Token
  toToken: Token
  poolAddress: string
}

export default function Swap({ title, helperText, helperTitle, fromToken, toToken, poolAddress }: Props) {
  const crvRef = useRef(null)
  const [amountToSwap, setAmountToSwap] = useState(0)
  const { data: signer } = useSigner()
  const { address } = useAccount()

  // get_dy is used to get estimated CRV for sdCRV
  // 0 is crv
  // 1 is sdcrv

  const { data: estimateTokensInReturn } = useContractRead({
    addressOrName: poolAddress,
    contractInterface: poolAbi,
    functionName: 'get_dy',
    args: [fromToken.id, toToken.id, ethers.utils.parseEther(amountToSwap.toString())],
  })

  const { balance: fromBalance } = useBalanceOf(fromToken.address, address, signer)
  const { balance: toBalance } = useBalanceOf(toToken.address, address, signer)
  const { allowance, loading: allowanceLoading } = useAllowance(fromToken.address, address, poolAddress, signer)

  // const { data } = useContractRead({
  //   addressOrName: sdcrvAddress,
  //   contractInterface: sdcrvAbi,
  //   functionName: 'balanceOf',
  //   args: [userAddress],
  // })

  // const {
  //   data: allowanceValue,
  //   isError: approveAmountError,
  //   isLoading: approveAmountIsLoading,
  // } = useContractRead({
  //   addressOrName: sdcrvAddress,
  //   contractInterface: sdcrvAbi,
  //   functionName: 'allowance',
  //   args: [address, poolAddress],
  // })

  // const executeExchange = async () => {
  //   const pool = Pool__factory.connect(poolAddress, signer)
  //   const res = await pool['exchange(int128,int128,uint256,uint256)'](
  //     fromTokenId,
  //     toTokenId,
  //     ethers.utils.parseEther(amountToSwap.toString()),
  //     ethers.utils.parseEther(tokensBackEstimated)
  //   )
  // }

  // exchange fromToken -> toToken
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
      args: [fromToken.id, toToken.id, ethers.utils.parseEther(amountToSwap.toString()), ethers.utils.parseEther('0')],
    })
  }

  const parsedFromBalance = useMemo(
    () => (fromBalance !== undefined ? parseFloat(ethers.utils.formatEther(fromBalance)).toFixed(2) : 'Loading'),
    [fromBalance]
  )

  const poolHasEnoughAllowance = useMemo(
    () => allowance && fromBalance && allowance.gt(fromBalance),
    [allowance, fromBalance]
  )

  const enableBuyButton = useMemo(
    () => poolHasEnoughAllowance && amountToSwap > 0 && !exhangeLoading,
    [poolHasEnoughAllowance, amountToSwap, exhangeLoading]
  )

  const handleClickMax = () => {
    crvRef.current.value = parsedFromBalance
    setAmountToSwap(parseInt(parsedFromBalance))
  }

  return (
    <div className="flex flex-col place-items-center p-20">
      <h2 className="mb-10 text-start text-2xl">{title}</h2>
      <div className="flex w-max flex-row justify-center space-x-20">
        <div className="flex w-64 flex-col rounded-sm border-2 p-2">
          <h2 className="text-lg font-bold">{helperTitle}</h2>
          <p>{helperText}</p>
        </div>
        <div className="flex w-96 flex-col rounded-sm border-2 p-2">
          <div className="h-30 flex w-full flex-col items-end px-2">
            <p className="my-1 text-xs">
              {fromToken.name} Balance: {parsedFromBalance}
            </p>
            <div className="flex w-full flex-row">
              <input
                ref={crvRef}
                type="number"
                id="amount"
                className="w-full text-right "
                placeholder="Amount"
                required
                onChange={e => setAmountToSwap(parseInt(e.target.value))}
              />
              <button
                onClick={() => handleClickMax()}
                className="w-1/5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Max
              </button>
            </div>
            {estimateTokensInReturn && (
              <p className="my-1 text-xs">
                You will recieve approximatly{' '}
                {parseFloat(ethers.utils.formatEther(estimateTokensInReturn?.toString())).toFixed(4)} {toToken.name}
              </p>
            )}
          </div>
          <div className="flex w-full flex-col">
            <Button
              variant={poolHasEnoughAllowance ? 'default' : 'primary'}
              disabled={allowanceLoading || poolHasEnoughAllowance}
            >
              {allowanceLoading ? 'Waiting for tx...' : 'Approve pool for ' + fromToken.name}
            </Button>
            <Button
              variant={enableBuyButton ? 'primary' : 'default'}
              disabled={!enableBuyButton}
              onClick={() => confirm()}
            >
              {exhangeLoading ? 'Waiting for tx...' : `Sell ${fromToken.name} for ${toToken.name}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
