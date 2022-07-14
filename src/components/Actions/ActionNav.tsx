import { ActionTab } from './Actions'

interface Props {
  activeTab: ActionTab
  routes: ActionTab[]
  onTabClick: (action: ActionTab) => void
}

export function ActionNav({ activeTab, routes, onTabClick }: Props) {
  return (
    <div className="flex flex-col border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
      <ul className="-mb-px flex flex-wrap">
        {routes.map((route, index) => {
          return (
            <li key={index} className="mr-2">
              <a
                href="#"
                onClick={something => onTabClick(route)}
                className={
                  route === activeTab
                    ? 'inline-block rounded-t-lg border-b-2 border-transparent bg-green-400 p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
                    : 'inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'
                }
              >
                {route}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
