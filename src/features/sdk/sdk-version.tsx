import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import EditThisPage from '@theme/EditThisPage'
import MDXContent from '@theme/MDXContent'
import TabItem from '@theme/TabItem'
import Tabs from '@theme/Tabs'
import React from 'react'

function useSdkLanguages() {
  return [
    {
      label: 'Python',
      value: 'python',
    },
    {
      label: 'Rust',
      value: 'rust',
    },
    {
      label: 'Go',
      value: 'go',
    },
    {
      label: 'Node.js',
      value: 'nodejs',
    },
    {
      label: 'Java',
      value: 'java',
    },
    {
      label: 'C/C++',
      value: 'cpp',
    },
  ]
}

export type ISdkVersionProps = {
  versions: Record<string, React.ReactNode>
}
export const SdkVersion: React.FC<ISdkVersionProps> = ({ versions }) => {
  const options = useSdkLanguages()
  const { i18n } = useDocusaurusContext()

  return (
    <div className="flex flex-col md:flex-row max-w-4xl w-full justify-between md:text-left mx-auto px-6 md:px-0 py-10">
      <Tabs className="mb-8" values={options} defaultValue={options[0].value}>
        {options.map(({ value }) => {
          const editUrl = `https://github.com/longportapp/openapi-website/edit/main/i18n/${i18n.currentLocale}/sdk-versions/${value}.md`

          return (
            <TabItem value={value} key={value} className="justify-center py-2! text-lg! hover:bg-transparent ">
              <div className="flex flex-col items-start justify-start pb-40">
                <div
                  className="theme-doc-markdown markdown"
                  style={{
                    width: '100%',
                  }}
                >
                  <MDXContent>{versions[value]}</MDXContent>
                  <div className="mt-10">
                    <EditThisPage editUrl={editUrl} />
                  </div>
                </div>
              </div>
            </TabItem>
          )
        })}
      </Tabs>
    </div>
  )
}
