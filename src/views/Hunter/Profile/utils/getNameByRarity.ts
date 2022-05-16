const getNameByRarity = (rarity: number) => {
  switch (rarity) {
    case 1:
      return "Common Hunter";
    case 2:
      return "Rare Hunter";
    case 3:
      return "Epic Hunter";
    case 4:
      return "Legendary Hunter";
    default:
      return "???";
  }
};

export default getNameByRarity;
