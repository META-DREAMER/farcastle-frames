import { parseEther } from "viem";

export function calculateMaxAffordableShares(
  walletBalanceWei: bigint,
  sharePriceWei: bigint
): number {
  const gasBuffer = parseEther("0.01"); // 0.001 ETH for gas
  if (walletBalanceWei <= gasBuffer) return 0;
  const availableWei = walletBalanceWei - gasBuffer;
  return Number(availableWei / sharePriceWei);
}

export function calculateSharesFromEthAmount(
  ethAmountWei: bigint,
  sharePriceWei: bigint
): number {
  return Number(ethAmountWei / sharePriceWei);
}

export function calculateOwnershipPercentage(
  shares: number,
  totalShares: number
): number {
  if (shares === 0 || totalShares === 0) return 0;
  const newTotalShares = totalShares + shares;
  return (shares * 100) / newTotalShares;
}

export function calculateRagequitValue(
  shares: number,
  totalShares: number,
  treasuryBalance: bigint
): bigint {
  if (shares === 0 || totalShares === 0) return 0n;
  return (treasuryBalance * BigInt(shares)) / BigInt(totalShares);
}
