import React from 'react';
import { domainWithLocalPath } from '@site/src/utils/use-locale-prefix';

const IndexPageShouldRedirect = () => {
  window.location.href = domainWithLocalPath('https://open.longbridgeapp.com', '');
  return <></>;
};
export default IndexPageShouldRedirect;
