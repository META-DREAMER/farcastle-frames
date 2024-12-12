import { formatEther, formatUnits } from "viem";

export function customFormatEther(
  wei: bigint | string,
  maxDecimals: number = 4,
  rounding: "floor" | "ceil" | "round" = "round"
) {
  const weiBigInt = typeof wei === "string" ? BigInt(wei) : wei;
  const power = 10n ** BigInt(18 - maxDecimals);
  const remainder = weiBigInt % power;
  const firstDecimal = remainder / 10n ** BigInt(18 - maxDecimals - 1);

  let b = weiBigInt - remainder;

  if (rounding === "ceil" || (rounding === "round" && firstDecimal >= 5n)) {
    b += power;
  }

  return formatEther(b);
}

export function customFormatUnits(
  value: bigint,
  decimals: number,
  maxDecimals: number = 2,
  rounding: "floor" | "ceil" | "round" = "round"
) {
  const power = 10n ** BigInt(decimals - maxDecimals);
  const remainder = value % power;
  const firstDecimal = remainder / 10n ** BigInt(decimals - maxDecimals - 1);

  let b = value - remainder;

  if (rounding === "ceil" || (rounding === "round" && firstDecimal >= 5n)) {
    b += power;
  }

  return formatUnits(b, decimals);
}
