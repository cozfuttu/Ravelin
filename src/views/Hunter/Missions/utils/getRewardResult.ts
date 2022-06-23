const getRewardResult = (reward: number, result: string) => {
  const modifier =
    result === "2" ? 1 : result === "3" ? 2 : result === "4" ? 4 : 0;
  return reward * modifier;
};

export default getRewardResult;
