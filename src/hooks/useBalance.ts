import { BigNumber, ethers, utils } from 'ethers'
import { Provider } from '@ethersproject/providers'
import { createPopper } from '@popperjs/core'
import { ERC20__factory } from 'contracts/typechain'
import { Signer } from 'ethers'
import { useCallback, useEffect, useMemo, useState } from 'react'

/**
 * Example implementation to use Popper: https://popper.js.org/
 */
export function useBalanceOf(contractAddress: string, address: string, signerOrProvider: Signer | Provider) {
  const [balance, setBalance] = useState<BigNumber>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!signerOrProvider || !address) return
    setLoading(true)
    ;(async () => {
      const _balance = await ERC20__factory.connect(contractAddress, signerOrProvider).balanceOf(address)
      setBalance(_balance)
      setLoading(false)
    })()
  }, [address, contractAddress, signerOrProvider])

  return { balance, loading }
}
