import Link from 'next/link'
import ConnectWallet from './Connect/ConnectWallet'
import ThemeToggleList from './Theme/ThemeToggleList'

export function Header() {
  return (
    <header>
      <div className="m-10 flex flex-row justify-between">
        <div>
          <ThemeToggleList />
        </div>
        <div className="flex flex-row items-start space-x-5">
          <div className="flex w-full flex-row items-start lg:ml-auto lg:inline-flex lg:h-auto  lg:w-auto lg:flex-row">
            <Link href="/buy">
              <a className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-green-600 hover:text-white lg:inline-flex lg:w-auto ">
                Buy
              </a>
            </Link>
            <Link href="/sell">
              <a className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-green-600 hover:text-white lg:inline-flex lg:w-auto">
                Sell
              </a>
            </Link>
            <Link href="/stake">
              <a className="w-full items-center justify-center rounded px-3 py-2 font-bold text-white hover:bg-green-600 hover:text-white lg:inline-flex lg:w-auto">
                Stake
              </a>
            </Link>
          </div>
        </div>

        <div className="mx-5 flex items-center">
          <ConnectWallet />
        </div>
      </div>
    </header>
  )
}
