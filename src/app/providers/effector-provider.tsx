import { fork } from 'effector';
import type { ReactNode } from 'react';
import { Provider } from 'effector-react';

interface Props {
  children: ReactNode;
}

const scope = fork();

export function EffectorProvider({ children }: Props) {
  return <Provider value={scope}>{children}</Provider>;
}
