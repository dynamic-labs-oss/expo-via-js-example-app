import { useEffect, useState } from 'react';
import { getCore } from '@dynamic-labs-sdk/client/core';
import type { DynamicCoreState } from '@dynamic-labs-sdk/client/core';

import { client } from '../client';

export const useDynamicClientState = (): DynamicCoreState => {
  const [state, setState] = useState<DynamicCoreState>(() =>
    getCore(client).state.get()
  );

  useEffect(() => {
    const core = getCore(client);
    return core.state.subscribe((newState) => {
      setState(newState);
    });
  }, []);

  return state;
};
