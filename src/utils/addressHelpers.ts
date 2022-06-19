import addresses from "config/constants/contracts";
import devAddresses from "config/constants/addresses";

const chainId = process.env.REACT_APP_CHAIN_ID;

export const getMulticallAddress = () => {
  return addresses.multiCall[chainId];
};
export const getWbnbAddress = () => {
  return addresses.wbnb[chainId];
};
export const getBusdAddress = () => {
  return addresses.busd[chainId];
};
export const getUsdtAddress = () => {
  return addresses.usdt[chainId];
};
export const getRavAddress = () => {
  return addresses.rav[chainId];
};
export const getRshareAddress = () => {
  return addresses.rshare[chainId];
};
export const getRbondAddress = () => {
  return addresses.rbond[chainId];
};
export const getRavNativeLPAddress = () => {
  return addresses.ravNativeLP[chainId];
};
export const getRshareNativeLPAddress = () => {
  return addresses.rshareNativeLP[chainId];
};
export const getRavRshareLPAddress = () => {
  return addresses.ravRshareLP[chainId];
};
export const getGenesisPoolsAddress = () => {
  return addresses.genesisPools[chainId];
};
export const getRsharePoolsAddress = () => {
  return addresses.rsharePools[chainId];
};
export const getRavPoolsAddress = () => {
  return addresses.ravPools[chainId];
};
export const getMasonryAddress = () => {
  return addresses.masonry[chainId];
};
export const getTreasuryAddress = () => {
  return addresses.treasury[chainId];
};
export const getHunterAddress = () => {
  return addresses.hunter[chainId];
};
export const getDevAddresses = () => {
  return devAddresses;
};
