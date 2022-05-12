import React from 'react';
import SdkPage from '@site/src/features/sdk';
import CppVersions from '@site/i18n/en/sdk-versions/cpp/index.md';
import PythonVersions from '@site/i18n/en/sdk-versions/python/index.md';

export default () => {
  return (
    <SdkPage
      versions={{
        cpp: <CppVersions />,
        python: <PythonVersions />,
      }}
    />
  );
};
