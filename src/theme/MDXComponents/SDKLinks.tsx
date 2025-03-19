import React from 'react'

import { camelCase, snakeCase } from 'lodash'

export const SDKLinks = ({
  module = 'quote',
  klass,
  method,
  go,
  java,
  level = 2,
  title = 'SDK Links',
}: {
  module?: 'quote' | 'trade'
  klass?: 'QuoteConext' | 'TradeContext'
  method: string
  go?: string
  java?: string
  level?: number
  title?: string | boolean
}) => {
  const snakeMethod = snakeCase(method)
  const camelMethod = camelCase(method)
  const capitalizedMethod = camelMethod.charAt(0).toUpperCase() + camelMethod.slice(1)
  const getPrefixedMethod = `get${capitalizedMethod}`

  let methodGo = go
  let methodJava = java

  const links = [
    {
      title: 'Python',
      color: '#3572a5',
      label: `longport.openapi.${klass}.${snakeMethod}`,
      url: `https://longportapp.github.io/openapi-sdk/python/${module}_context/#longport.openapi.${klass}.${snakeMethod}`,
    },
    {
      title: 'Rust',
      color: '#dea584',
      label: `longport::${module}::${klass}#${snakeMethod}`,
      url: `https://longportapp.github.io/openapi-sdk/rust/longport/${module}/struct.${klass}.html#method.${snakeMethod}`,
    },
    {
      title: 'Go',
      color: '#00ADD8',
      label: `${klass}.${methodGo || capitalizedMethod}`,
      url: `https://pkg.go.dev/github.com/longportapp/openapi-go/${module}#${klass}.${methodGo || capitalizedMethod}`,
    },
    {
      title: 'Node.js',
      color: '#f1e05a',
      label: `${klass}#${camelMethod}`,
      url: `https://longportapp.github.io/openapi-sdk/nodejs/classes/${klass}.html#${camelMethod}`,
    },
  ]

  if (methodJava) {
    links.push({
      title: 'Java',
      color: '#b07219',
      label: `${klass}.${getPrefixedMethod}`,
      url: `https://longportapp.github.io/openapi-sdk/java/com/longport/${module}/${klass}.html#${methodJava}`,
    })
  }

  return (
    <>
      {title && (
        <>
          {level === 2 && <h2>{title}</h2>}
          {level === 3 && <h3>{title}</h3>}
          {level === 4 && <h4>{title}</h4>}
          {level === 5 && <h5>{title}</h5>}
        </>
      )}
      <table className="table" style={{ display: 'table' }}>
        <tbody>
          {links.map(({ title, color, label, url }) => (
            <tr key={title}>
              <td className="bg-gray-50 w-[100px]">
                <div className="flex items-center gap-x-2 text-sm">
                  <div
                    style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '8px',
                      backgroundColor: color,
                      borderRadius: '1px',
                    }}
                  ></div>
                  <div>{title}</div>
                </div>
              </td>
              <td
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <a href={url} target="_blank">
                  {label}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default SDKLinks
