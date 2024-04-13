import React from 'react'
import SdkPage from '@site/src/features/sdk'
import CppVersions from '@site/i18n/en/sdk-versions/cpp.md'
import PythonVersions from '@site/i18n/en/sdk-versions/python.md'
import RustVersions from '@site/i18n/en/sdk-versions/rust.md'
import NodejsVersions from '@site/i18n/en/sdk-versions/nodejs.md'
import JavaVersions from '@site/i18n/en/sdk-versions/java.md'
import GoVersions from '@site/i18n/en/sdk-versions/go.md'

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
