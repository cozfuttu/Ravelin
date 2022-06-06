const calculateCooldown = (cooldown: number) => {
  const cooldownHours =
    (cooldown / 3600).toFixed(0) === "0"
      ? ""
      : `${(cooldown / 3600).toFixed(0)}h`;
  const cooldownMinutes =
    ((cooldown % 3600) / 60).toFixed(0) === "0"
      ? ""
      : `${((cooldown % 3600) / 60).toFixed(0)}m`;
  const cooldownSeconds =
    ((cooldown % 3600) % 60).toFixed(0) === "0"
      ? ""
      : `${((cooldown % 3600) % 60).toFixed(0)}s`;
  const cooldownText =
    cooldown !== 0
      ? `${cooldownHours} ${cooldownMinutes} ${cooldownSeconds}`
      : "-";
  return cooldownText;
};

export default calculateCooldown;
