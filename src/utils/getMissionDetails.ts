import { tokenAddresses, lpAddresses } from "config/constants/addresses";

const getMissionDetails = (
  requiredRarity: number,
  paidTokenAddress: string,
  earnedTokenAddress: string
) => {
  const name =
    requiredRarity === 1
      ? "Raid the station of smugglers"
      : requiredRarity === 2
      ? "Sabotage the enemy spaceship"
      : requiredRarity === 3
      ? "Lead the negotiations"
      : requiredRarity === 4
      ? "Defend the locals against the bug invasion"
      : "???";

  const imageUri =
    requiredRarity === 1
      ? "/images/nfts/PolygalacticMission1.webp"
      : requiredRarity === 2
      ? "/images/nfts/PolygalacticMission2.webp"
      : requiredRarity === 3
      ? "/images/nfts/PolygalacticMission3.webp"
      : requiredRarity === 4
      ? "/images/nfts/PolygalacticMission4.webp"
      : "???";

  const playableWith = Object.keys(tokenAddresses).find(
    (key) => tokenAddresses[key] === paidTokenAddress
  );
  const gain = Object.keys(tokenAddresses).find(
    (key) => tokenAddresses[key] === earnedTokenAddress
  );
  console.log(
    "paidTokenAddress: ",
    paidTokenAddress,
    "earnedTokenAddres",
    earnedTokenAddress,
    "playableWith: ",
    playableWith,
    "gain: ",
    gain
  );
  const lpAddressOfPaidToken = lpAddresses[playableWith.toLowerCase() + "Mada"];
  const lpAddressOfEarnedToken = lpAddresses[gain.toLowerCase() + "Mada"];

  return {
    name,
    imageUri,
    playableWith,
    gain,
    lpAddressOfPaidToken,
    lpAddressOfEarnedToken,
  };
};

export default getMissionDetails;
