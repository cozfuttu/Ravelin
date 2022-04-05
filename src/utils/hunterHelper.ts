const mapRarityToString = (rarity: number): string => {
  switch (rarity) {
    case 1:
      return 'Common'
    case 2:
      return 'Rare'
    case 3:
      return 'Epic'
    case 4:
      return 'Legendary'
    default:
      return 'Common'
  }
}

export default mapRarityToString
