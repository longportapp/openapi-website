import React from 'react';
import classnames from 'classnames';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import MDXContent from '@theme/MDXContent';
import styles from './sdk-version.module.scss';

function useSdkLanguages() {
  return [
    {
      label: 'Python',
      value: 'python',
    },
    {
      label: 'C++',
      value: 'cpp',
    },
  ];
}

export type ISdkVersionProps = {
  versions: Record<string, React.ReactNode>
}
export const SdkVersion: React.FC<ISdkVersionProps> = ({ versions }) => {
  const options = useSdkLanguages();
  return (
    <div className={classnames(styles.container)}>
      <Tabs className="tabs" values={options} defaultValue={options[0].value}>
        {options.map(({ value }) => {
          return (
            <TabItem value={value} key={value}>
              <div className="pb-40 px-3 flex flex-col justify-start items-start">
                <div className="theme-doc-markdown markdown" style={{
                  width: '100%'
                }} >
                  <MDXContent>
                    {versions[value]}

                  </MDXContent>
                </div>
              </div>
            </TabItem>
          );
        })}
      </Tabs>
    </div>
  );
};
