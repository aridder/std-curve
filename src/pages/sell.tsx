import Swap from 'components/Swap'
import { address as CRVAddress } from 'contracts/crv'
import { address as poolAddress } from 'contracts/crvsdcrvpool'
import { address as sdCRVAddress } from 'contracts/sdcrv'

export default function Sell() {
  return (
    <Swap
      title={'Swap sdCRV for CRV'}
      helperTitle={'Helper Title'}
      helperText={'Helper Text'}
      fromToken={{ address: sdCRVAddress, id: 1, name: 'sdCRV' }}
      toToken={{ address: CRVAddress, id: 0, name: 'CRV' }}
      poolAddress={poolAddress}
    />
  )
}
