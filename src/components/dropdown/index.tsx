import classNames from 'classnames'
import React from 'react'
import { useClickAway } from 'ahooks'
import styles from './index.module.scss'

export type IDropdownProps = {
  items?: {
    label: string
    shortLabel?: string | React.ReactNode
    value: string | number
  }[]
  className?: string
  content?: React.ReactNode
  onChange?: (value: any) => void
  value?: string | number
}
const Dropdown: React.FC<IDropdownProps> = ({ value, content, className, children, onChange, items = [] }) => {
  const [showContent, setShowContent] = React.useState(false)
  const selectedItem = items.find(item => item.value === value)
  const containerRef = React.useRef(null)
  useClickAway(() => {
    setShowContent(false)
  }, containerRef)

  return (
    <div className={classNames(styles.dropdown, className)} ref={containerRef}>
      <div className="trigger" onClick={() => setShowContent(!showContent)}>
        {selectedItem ? (
          <div className="flex items-center">
            <span>{selectedItem.shortLabel || selectedItem.label}</span>
            <div className="text-[8px] ml-1">
              <img src="https://pub.lbkrs.com/static/offline/202111/oPFw5UmKNxErcZsQ/caret-down.svg" alt="caret-down" />
            </div>
          </div>
        ) : (
          children
        )}
      </div>
      <div
        className={classNames('content', {
          'content-visible': showContent,
        })}
        onClick={() => setShowContent(false)}
      >
        {items.length > 0 &&
          items.map(item => {
            return (
              <div
                key={item.value}
                className={classNames('dropdown-menu__item', {
                  'dropdown-menu__item--selected': item.value === value,
                })}
                onClick={() => onChange(item.value)}
              >
                {item.label}
              </div>
            )
          })}
        {content}
      </div>
    </div>
  )
}

export default Dropdown
