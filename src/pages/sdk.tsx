import React from 'react';
import { domainWithLocalPath } from '@site/src/utils/use-locale-prefix';

const SDKPageShouldRedirect = () => {
  window.location.href = domainWithLocalPath('https://open.longbridgeapp.com', 'sdk');
  return <></>;
};
export default SDKPageShouldRedirect;
