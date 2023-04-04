import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import React, { FC } from 'react'

const ApplicationLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout title={`${siteConfig.title}`} description="LongPort OpenAPI">
      {children}
    </Layout>
  )
}
export default ApplicationLayout
