'use client';

import { useQuery } from "@apollo/client";
import { abi } from "lib/abi";
import { getTriplesWithMyPosition } from "lib/queries";
import { parseEther } from "viem";
import { useAccount, useWriteContract } from "wagmi";
import Button from "./Button";
import { usePrivy } from "@privy-io/react-auth";

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

  return (
    <div className="border-1 flex flex-col items-start gap-2 rounded border border-black bg-slate-100 p-3 mb-4">
      <h1 className="text-4xl font-bold">Ethereum values</h1>
      {loading && <div>Loading...</div>}
      {error && <div>Error loading values: {error.message}</div>}
      {data && (
        <>
          {data.triples.map((triple) => (
              <div key={triple.id} className="mb-4">
                <h2 className="text-xl font-bold">{triple.object?.label}</h2>
                <p>{triple.object?.value?.thing?.description}</p>
                <p>Votes: {triple.vault?.positionCount}</p>
                <p>{triple.vault?.myPosition?.length !== 0 && 'Voted for'}</p>
                <Button
                  disabled={isPending}
                  cta="Vote for"
                  onClick_={() => handleDepositTriple(triple.vault?.id)}
                />

            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Triples;
