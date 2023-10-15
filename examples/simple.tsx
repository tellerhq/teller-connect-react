import React, { useCallback, useState } from 'react';

import { useTellerConnect, TellerConnectOnSuccess } from 'teller-connect-react';

const SimpleTellerConnect = () => {
  const appId = 'your_app_id';
  const onSuccess = useCallback<TellerConnectOnSuccess>((authorization) => {
    console.log(authorization);
  }, []);

  const { open, ready } = useTellerConnect({
    appId,
    onSuccess,
  });

  return (
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );
};

export default SimpleTellerConnect;
