'use client';

import Button from 'components/Button';
import { useAccount } from 'wagmi';
import { useSwitchChain } from 'wagmi';

const SwitchNetwork = () => {
  const { chain } = useAccount();

  const { chains, error: switchNetworkError, switchChain } = useSwitchChain();

  return (
    <>
      {chain && (
        <p>
          Connected to {chain.name}
        </p>
      )}
      <div className="flex flex-row items-center gap-2">
        <p>Switch chains: </p>
        {chains.map((x) => (
          <Button
            disabled={!switchChain || x.id === chain?.id}
            key={x.id}
            onClick_={() => switchChain?.({ chainId: x.id })}
            cta={x.name}
          />
        ))}
        {switchNetworkError && (
          <div>Network switch error: {JSON.stringify(switchNetworkError, null, 2)}</div>
        )}
      </div>
    </>
  );
};

export default SwitchNetwork;
