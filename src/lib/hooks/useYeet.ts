import { useState } from "react";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";

interface UseYeetProps {
  contractAddress: `0x${string}`;
}

interface UseYeetReturn {
  yeet: (amount: bigint) => void;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  txHash: string | null;
  isConfirming: boolean;
  isConfirmed: boolean;
}

export function useYeet({ contractAddress }: UseYeetProps): UseYeetReturn {
  const [txHash, setTxHash] = useState<string | null>(null);

  const { isConnected } = useAccount();
  const {
    sendTransaction,
    error: sendTxError,
    isError: isSendTxError,
    isPending: isSendTxPending,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: txHash as `0x${string}`,
    });

  const yeet = (amount: bigint) => {
    if (!isConnected || amount <= 0n) return;

    sendTransaction(
      {
        to: contractAddress,
        value: amount,
        data: "0x9846cd9e", // yeet() function selector
      },
      {
        onSuccess: (hash) => {
          setTxHash(hash);
        },
      }
    );
  };

  return {
    yeet,
    isLoading: isSendTxPending || isConfirming,
    isError: isSendTxError,
    error: sendTxError,
    txHash,
    isConfirming,
    isConfirmed,
  };
}
