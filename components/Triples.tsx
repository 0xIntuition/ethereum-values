'use client';

import { useQuery } from '@apollo/client';
import { abi } from 'lib/abi';
import { getTriplesWithMyPosition } from 'lib/queries';
import { parseEther } from 'viem';
import type { Address } from 'viem';
import { useAccount, useWriteContract } from 'wagmi';

import { usePrivy } from '@privy-io/react-auth';

import { AccountImage } from './AccountImage';

const Triples = () => {
  const { login } = usePrivy();
  const account = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();

  const { data, error, loading } = useQuery(getTriplesWithMyPosition, {
    variables: {
      predicateId: 6639,
      subjectId: 535,
      address: account?.address?.toLowerCase() || '',
    },
    pollInterval: 1000,
  });

  const handleDepositTriple = async (vaultId: number) => {
    if (!account.address) {
      login();
      return;
    }
    await writeContractAsync({
      abi: abi,
      address: '0x1A6950807E33d5bC9975067e6D6b5Ea4cD661665',
      functionName: 'depositTriple',
      args: [account.address, BigInt(vaultId)],
      value: parseEther('0.0042'),
    });
  };

  const handleRedeemTriple = async (vaultId: number, shares: string) => {
    if (!account.address) {
      login();
      return;
    }
    await writeContractAsync({
      abi: abi,
      address: '0x1A6950807E33d5bC9975067e6D6b5Ea4cD661665',
      functionName: 'redeemTriple',
      args: [BigInt(shares), account.address, BigInt(vaultId)],
    });
  };

  return (
    <div className="border-1 mb-4 flex flex-col items-start gap-2 rounded border border-black bg-slate-100 p-3">
      <h1 className="text-4xl font-bold">Ethereum values</h1>
      {loading && <div>Loading...</div>}
      {error && <div>Error loading values: {error.message}</div>}
      {data && (
        <>
          {data.triples.map((triple) => {
            const myPositionFor = triple.vault?.myPosition?.length !== 0;
            const myPositionAgainst = triple.counter_vault?.myPosition?.length !== 0;

            return (
              <div key={triple.id} className="mb-4">
                <h2 className="text-xl font-bold">{triple.object?.label}</h2>
                <p>{triple.object?.value?.thing?.description}</p>

                <div className="mb-2 flex gap-2">
                  <button
                    className={`rounded border border-green-800 px-4 py-1 ${myPositionFor ? 'bg-green-800 text-white' : 'bg-green-200 text-black'
                      } disabled:cursor-not-allowed disabled:opacity-50`}
                    disabled={isPending || myPositionAgainst}
                    onClick={() =>
                      myPositionFor
                        ? handleRedeemTriple(triple.vault?.id, triple.vault?.myPosition[0].shares)
                        : handleDepositTriple(triple.vault?.id)
                    }
                  >
                    👍 {triple.vault?.position_count}{' '}
                  </button>
                  <div className="flex flex-row">
                    {triple.vault?.myPosition.map((position) => (
                      <AccountImage
                        key={position.account_id}
                        id={position.account_id as Address}
                        image={position.account?.image}
                        label={position.account?.label}
                      />
                    ))}

                    {triple.vault?.positions.map((position) => (
                      <AccountImage
                        key={position.account_id}
                        id={position.account_id as Address}
                        image={position.account?.image}
                        label={position.account?.label}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    className={`rounded border border-red-800 px-4 py-1 ${myPositionAgainst ? 'bg-red-800 text-white' : 'bg-red-100 text-black'
                      } disabled:cursor-not-allowed disabled:opacity-50 `}
                    disabled={isPending || myPositionFor}
                    onClick={() =>
                      myPositionAgainst
                        ? handleRedeemTriple(
                          triple.counter_vault?.id,
                          triple.counter_vault?.myPosition[0].shares,
                        )
                        : handleDepositTriple(triple.counter_vault?.id)
                    }
                  >
                    👎 {triple.counter_vault?.position_count}{' '}
                  </button>
                  <div className="flex flex-row">
                    {triple.counter_vault?.myPosition.map((position) => (
                      <AccountImage
                        key={position.account_id}
                        id={position.account_id as Address}
                        image={position.account?.image}
                        label={position.account?.label}
                      />
                    ))}
                    {triple.counter_vault?.positions.map((position) => (
                      <AccountImage
                        key={position.account_id}
                        id={position.account_id as Address}
                        image={position.account?.image}
                        label={position.account?.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Triples;
