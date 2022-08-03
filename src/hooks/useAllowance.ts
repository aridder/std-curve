import { BigNumber, ethers, utils } from 'ethers'
import { Provider } from '@ethersproject/providers'
import { createPopper } from '@popperjs/core'
import { ERC20__factory } from 'contracts/typechain'
import { Signer } from 'ethers'
import { useCallback, useEffect, useMemo, useState } from 'react'

/**
 * Example implementation to use Popper: https://popper.js.org/
 */
export function useAllowance(
  contractAddress: string,
  owner: string,
  spender: string,
  signerOrProvider: Signer | Provider
) {
  const [allowance, setAllowance] = useState<BigNumber>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!owner || !signerOrProvider) return
    setLoading(true)
    ;(async () => {
      const _allowance = await ERC20__factory.connect(contractAddress, signerOrProvider).allowance(owner, spender)
      setAllowance(_allowance)
      setLoading(false)
    })()
  }, [contractAddress, owner, signerOrProvider, spender])

  return { allowance, loading }
}
