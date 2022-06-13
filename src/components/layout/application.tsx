import React, { FC } from 'react'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

const ApplicationLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout title={`${siteConfig.title}`} description="Longbridge 开放平台">
      {children}
    </Layout>
  )
}
export default ApplicationLayout
