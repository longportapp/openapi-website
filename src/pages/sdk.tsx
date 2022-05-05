import React, { useEffect } from 'react';
import Loading from '@site/src/components/Loading';
import { domainWithLocalPath } from '@site/src/utils/use-locale-prefix';

const SDKPageShouldRedirect = () => {
  const path = domainWithLocalPath('https://open.longbridgeapp.com', 'sdk');
  useEffect(() => {
    window.location.href = path;
  }, []);
  return <Loading />;
};
export default SDKPageShouldRedirect;
