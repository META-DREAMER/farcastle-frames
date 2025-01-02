// Constants
export const HIDDEN_AVATARS_TO_SHOW = 3;

// Utility functions
export const calculatePercentage = (
  shares: number,
  totalShares: number
): number => (shares / totalShares) * 100;

export const calculateFunderPercentages = (
  funders: Array<{ shares: number }>,
  totalShares: number,
  userPercentage: number = 0
) => {
  const visibleFundersPercentage = funders.reduce(
    (acc, funder) => acc + calculatePercentage(funder.shares, totalShares),
    0
  );
  return {
    visibleFundersPercentage,
    remainingPercentage: 100 - userPercentage - visibleFundersPercentage,
  };
};
