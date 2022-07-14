import { ActionNav } from 'components/Actions/ActionNav'
import { Buy } from 'components/Actions/Buy'
import { Stake } from 'components/Actions/Stake'
import { useState } from 'react'
import { Sell } from './Sell'

export type ActionTab = 'Stake' | 'Sell' | 'Buy'

export function Actions() {
  const [activeTab, setActiveTab] = useState<ActionTab>('Stake')

  return (
    <div className="flex w-1/3 flex-col">
      <h1 className="my-3 font-bold">Actions</h1>
      <div className="flex flex-col justify-center rounded-xl bg-sky-500/10 p-6 text-center">
        <ActionNav activeTab={activeTab} routes={['Stake', 'Buy', 'Sell']} onTabClick={tab => setActiveTab(tab)} />
        {activeTab === 'Stake' && <Stake />}
        {/* {activeTab === 'Lock' && <Lock />} */}
        {activeTab === 'Buy' && <Buy />}
        {activeTab === 'Sell' && <Sell />}
      </div>
    </div>
  )
}
