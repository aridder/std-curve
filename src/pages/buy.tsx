import Swap from 'components/Swap'
import { address as CRVAddress } from 'contracts/crv'
import { address as poolAddress } from 'contracts/crvsdcrvpool'
import { address as sdCRVAddress } from 'contracts/sdcrv'

export default function Buy() {
  return (
    <Swap
      title={'Swap CRV for sdCRV'}
      helperTitle={'Helper Title'}
      helperText={'Helper Text'}
      fromToken={{ address: CRVAddress, id: 0, name: 'CRV' }}
      toToken={{ address: sdCRVAddress, id: 1, name: 'sdCRV' }}
      poolAddress={poolAddress}
    />
  )
}
