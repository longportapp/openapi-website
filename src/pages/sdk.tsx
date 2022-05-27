import React from 'react';
import SdkPage from '@site/src/features/sdk';
import CppVersions from '@site/i18n/zh-CN/sdk-versions/cpp.md';
import PythonVersions from '@site/i18n/zh-CN/sdk-versions/python.md';
import RustVersions from '@site/i18n/zh-CN/sdk-versions/rust.md';

export default () => {
  return (
    <SdkPage
      versions={{
        cpp: <CppVersions />,
        python: <PythonVersions />,
        rust: <RustVersions />,
      }}
    />
  );
};
