const calculateRewards = (reward: number, rewardTokenName: string) => {
  const rewardFormattedMediocreSuccess =
    Number(reward) >= 1e9
      ? `${reward / 1e9} Bil ${rewardTokenName}`
      : reward
      ? `${Number(reward).toLocaleString("en", {
          maximumFractionDigits: 5,
        })} ${rewardTokenName}`
      : "-";

  const rewardFormattedSuccess =
    Number(reward * 2) >= 1e9
      ? `${(reward * 2) / 1e9} Bil ${rewardTokenName}`
      : reward
      ? `${Number(reward * 2).toLocaleString("en", {
          maximumFractionDigits: 5,
        })} ${rewardTokenName}`
      : "-";

  const rewardFormattedGreatSuccess =
    Number(reward * 4) >= 1e9
      ? `${(reward * 4) / 1e9} Bil ${rewardTokenName}`
      : reward
      ? `${Number(reward * 4).toLocaleString("en", {
          maximumFractionDigits: 5,
        })} ${rewardTokenName}`
      : "-";

  return {
    mediocreReward: rewardFormattedMediocreSuccess,
    successReward: rewardFormattedSuccess,
    greatReward: rewardFormattedGreatSuccess,
  };
};

export default calculateRewards;
