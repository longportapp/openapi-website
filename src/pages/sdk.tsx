import React from 'react'
import SdkPage from '@site/src/features/sdk'
import CppVersions from '@site/i18n/zh-CN/sdk-versions/cpp.md'
import PythonVersions from '@site/i18n/zh-CN/sdk-versions/python.md'
import RustVersions from '@site/i18n/zh-CN/sdk-versions/rust.md'
import NodejsVersions from '@site/i18n/zh-CN/sdk-versions/nodejs.md'
import GolangVersions from '@site/i18n/zh-CN/sdk-versions/golang.md'

export default () => {
  return (
    <SdkPage
      versions={{
        cpp: <CppVersions />,
        python: <PythonVersions />,
        rust: <RustVersions />,
        nodejs: <NodejsVersions />,
        golang: <GolangVersions />,
      }}
    />
  )
}
