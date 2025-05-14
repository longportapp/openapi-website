import React from 'react'
import { Banners } from '@site/src/features/sdk/banners'
import { SdkVersion, ISdkVersionProps } from '@site/src/features/sdk/sdk-version'
import ApplicationLayout from '@site/src/components/layout/application'
import { translate } from '@docusaurus/Translate'

const SdkPage: React.FC<ISdkVersionProps> = ({ versions }) => {
  return (
    <ApplicationLayout>
      <div style={{ backgroundColor: '#f8f9fa' }} className="border-b border-gray-300 text-center">
        <div className="flex flex-col md:flex-row max-w-4xl items-center gap-6 justify-between text-center md:text-left mx-auto px-6 md:px-0 py-10">
          <div className="gap-4">
            <p className="font-bold text-2xl">SDK</p>
            <p className="text-lg">
              {translate({
                id: 'pages.sdk.banners.desc',
              })}
            </p>
          </div>
          <div>
            <img className="w-[400px]" src="https://pub.lbkrs.com/files/202503/vEnnmgUM6bo362ya/sdk.svg" alt="" />
          </div>
        </div>
      </div>
      <SdkVersion versions={versions} />
    </ApplicationLayout>
  )
}
export default SdkPage
