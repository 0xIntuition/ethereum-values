'use client';

import { useQuery } from "@apollo/client";
import { abi } from "lib/abi";
import { getTriplesWithMyPosition } from "lib/queries";
import { parseEther } from "viem";
import { useAccount, useWriteContract } from "wagmi";
import Button from "./Button";

const Triples = () => {
  const account = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();

  const { data, error, loading } = useQuery(getTriplesWithMyPosition, {
    variables: {
      predicateId: 3,
      objectId: 747,
      address: account?.address?.toLowerCase(),
    },
    pollInterval: 1000,
  });

  const handleDepositTriple = async (tripleId: number) => {
    if (!account.address) {
      return;
    }
    await writeContractAsync({
      abi: abi,
      address: '0x1A6950807E33d5bC9975067e6D6b5Ea4cD661665',
      functionName: 'depositTriple',
      args: [account.address, BigInt(tripleId)],
      value: parseEther('0.0042'),
    });
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error loading values: {error.message}</div>}
      {data && (
        <div>
          <h1>Values</h1>
          <ul>
            {data.triples.map((triple) => (
              <li key={triple.id}>{triple.label}, {triple.vault?.positionCount}, {triple.vault?.myPosition?.length ? 'Voted' : 'Not voted'}
                <Button
                  disabled={isPending}
                  cta="Vote"
                  onClick_={() => handleDepositTriple(triple.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};

export default Triples;
