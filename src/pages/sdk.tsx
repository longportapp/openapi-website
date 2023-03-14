import React from 'react'
import SdkPage from '@site/src/features/sdk'
import PythonVersions from '@site/i18n/zh-CN/sdk-versions/python.md'
import RustVersions from '@site/i18n/zh-CN/sdk-versions/rust.md'
import GoVersions from '@site/i18n/zh-CN/sdk-versions/go.md'
import NodejsVersions from '@site/i18n/zh-CN/sdk-versions/nodejs.md'
import JavaVersions from '@site/i18n/zh-CN/sdk-versions/java.md'
import CppVersions from '@site/i18n/zh-CN/sdk-versions/cpp.md'

export default () => {
  return (
    <SdkPage
      versions={{
        python: <PythonVersions />,
        rust: <RustVersions />,
        go: <GoVersions />,
        nodejs: <NodejsVersions />,
        java: <JavaVersions />,
        cpp: <CppVersions />,
      }}
    />
  )
}
