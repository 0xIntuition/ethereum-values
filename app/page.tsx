'use client';

import Button from 'components/Button';
import SwitchNetwork from 'components/SwitchNetwork';
import Triples from 'components/Triples';
import { shorten } from 'lib/utils';
import { useAccount, useDisconnect } from 'wagmi';

import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useSetActiveWallet } from '@privy-io/wagmi';


const MonoLabel = ({ label }: { label: string }) => {
  return <span className="rounded-xl bg-slate-200 px-2 py-1 font-mono">{label}</span>;
};

export default function Home() {
  // Privy hooks
  const { ready, user, authenticated, login, connectWallet, logout, linkWallet } = usePrivy();
  const { wallets, ready: walletsReady } = useWallets();

  // WAGMI hooks
  const { address, isConnected, isConnecting, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { setActiveWallet } = useSetActiveWallet();

  if (!ready) {
    return null;
  }

  return (
    <>
      <main className="min-h-screen bg-slate-200 p-4 text-slate-800">
        <Triples />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="border-1 flex flex-col items-start gap-2 rounded border border-black bg-slate-100 p-3">
            <h1 className="text-4xl font-bold">Privy</h1>
            {ready && !authenticated && (
              <>
                <p>You are not authenticated with Privy</p>
                <div className="flex items-center gap-4">
                  <Button onClick_={login} cta="Login with Privy" />
                </div>
              </>
            )}

            {walletsReady &&
              wallets.map((wallet) => {
                return (
                  <div
                    key={wallet.address}
                    className="flex min-w-full flex-row flex-wrap items-center justify-between gap-2 bg-slate-50 p-4"
                  >
                    <div>
                      <MonoLabel label={shorten(wallet.address)} />
                    </div>
                    <Button
                      cta="Make active"
                      onClick_={() => {
                        setActiveWallet(wallet);
                      }}
                    />
                  </div>
                );
              })}

            {ready && authenticated && (
              <>
                <p className="mt-2">You are logged in with privy.</p>
                <Button onClick_={connectWallet} cta="Connect another wallet" />
                <Button onClick_={linkWallet} cta="Link another wallet" />

                <br />
                <Button onClick_={logout} cta="Logout from Privy" />
              </>
            )}
          </div>
          <div className="border-1 flex flex-col items-start gap-2 rounded border border-black bg-slate-100 p-3">
            <h1 className="text-4xl font-bold">WAGMI</h1>
            <p>
              Connection status: {isConnecting && <span>🟡 connecting...</span>}
              {isConnected && <span>🟢 connected.</span>}
              {isDisconnected && <span> 🔴 disconnected.</span>}
            </p>
            {isConnected && address && (
              <>
                <h2 className="mt-6 text-2xl">useAccount</h2>
                <p>
                  address: <MonoLabel label={address} />
                </p>

                <SwitchNetwork />


                <h2 className="mt-6 text-2xl">useDisconnect</h2>
                <Button onClick_={disconnect} cta="Disconnect from WAGMI" />
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
