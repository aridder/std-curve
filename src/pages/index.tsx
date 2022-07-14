import { Actions } from 'components/Actions/Actions'
import { Balances } from 'components/Balance/Balances'
import ConnectWallet from 'components/Connect/ConnectWallet'
import { Earnings } from 'components/Earnings'
import ThemeToggleList from 'components/Theme/ThemeToggleList'
import styles from 'styles/Home.module.scss'
import { useAccount } from 'wagmi'

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Main />
    </div>
  )
}

function Header() {
  return (
    <header>
      <div className="m-10 flex flex-row justify-between">
        <div>
          <ThemeToggleList />
        </div>
        <div>StakeDAO CRV Locker</div>

        <div className="mx-5 flex items-center">
          <ConnectWallet />
        </div>
      </div>
    </header>
  )
}

function Main() {
  const { address, isConnected, connector } = useAccount()
  return (
    <main className={'space-y-6'}>
      <div className="flex flex-row justify-center space-x-10">
        {!isConnected && <div>Please connect your wallet to use the dapp</div>}
        {isConnected && <Balances />}
        {isConnected && <Actions />}
        {isConnected && <Earnings />}
      </div>
    </main>
  )
}
