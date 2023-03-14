import React from 'react'
import SdkPage from '@site/src/features/sdk'
import CppVersions from '@site/i18n/en/sdk-versions/cpp.md'
import PythonVersions from '@site/i18n/en/sdk-versions/python.md'
import RustVersions from '@site/i18n/en/sdk-versions/rust.md'
import NodejsVersions from '@site/i18n/en/sdk-versions/nodejs.md'
import GoVersions from '@site/i18n/en/sdk-versions/go.md'

export default () => {
  return (
    <SdkPage
      versions={{
        cpp: <CppVersions />,
        python: <PythonVersions />,
        rust: <RustVersions />,
        nodejs: <NodejsVersions />,
        go: <GoVersions />,
      }}
    />
  )
}
