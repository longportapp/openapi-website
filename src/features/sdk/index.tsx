import React from 'react';
import { Banners } from '@site/src/features/sdk/banners';
import { SdkVersion, ISdkVersionProps } from '@site/src/features/sdk/sdk-version';
import ApplicationLayout from '@site/src/components/layout/application';

const SdkPage: React.FC<ISdkVersionProps> = ({
  versions
}) => {
  return (
    <ApplicationLayout>
      <Banners />
      <SdkVersion versions={versions} />
    </ApplicationLayout>
  );
};
export default SdkPage;
