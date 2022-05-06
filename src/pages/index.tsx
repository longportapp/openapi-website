import React, { useEffect } from 'react';
import { domainWithLocalPath } from '@site/src/utils/use-locale-prefix';
import Loading from '@site/src/components/loading';

const IndexPageShouldRedirect = () => {
  const path = domainWithLocalPath('https://open.longbridgeapp.com', '');
  useEffect(() => {
    window.location.href = path;
  }, []);
  return <Loading />;
};
export default IndexPageShouldRedirect;
