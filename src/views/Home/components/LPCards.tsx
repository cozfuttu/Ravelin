import BigNumber from "bignumber.js";
import {
  useBurnedBalanceRavNativeLP,
  useBurnedBalanceRshareNativeLP,
  useTotalSupplyRavNativeLP,
  useTotalSupplyRshareNativeLP,
} from "hooks/useTokenBalance";
import React from "react";
import { usePriceRavNativeLP, usePriceRshareNativeLP } from "state/hooks";
import styled from "styled-components";
import LPCard from "./LPCard";

const Cards = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 80%;
  margin-top: 2em;
  gap: 32px;
  margin-left: 3vw;

  @media (max-width: 1080px) {
    flex-direction: column;
    gap: 24px;
    width: 90%;
    padding-bottom: 100px;
    margin-left: 0;
  }
`;

const LPCards = () => {
  const totalSupplyRavNativeLP = useTotalSupplyRavNativeLP();
  const totalSupplyRshareNativeLP = useTotalSupplyRshareNativeLP();

  const burnedBalanceRav = useBurnedBalanceRavNativeLP();
  const burnedBalanceRshare = useBurnedBalanceRshareNativeLP();

  const ravLPPriceUsd = usePriceRavNativeLP();
  const rshareLPPriceUsd = usePriceRshareNativeLP();

  const circSupplyRavLP = totalSupplyRavNativeLP
    ? totalSupplyRavNativeLP.minus(burnedBalanceRav)
    : new BigNumber(0);
  const circSupplyRshareLP = totalSupplyRshareNativeLP
    ? totalSupplyRshareNativeLP.minus(burnedBalanceRshare)
    : new BigNumber(0);

  const marketCapRavLP = circSupplyRavLP.times(ravLPPriceUsd);
  const marketCapRshareLP = circSupplyRshareLP.times(rshareLPPriceUsd);

  return (
    <Cards>
      <LPCard
        lpName="RAV-mADA"
        totalSupply={totalSupplyRavNativeLP}
        LPPriceUSD={ravLPPriceUsd}
        marketCap={marketCapRavLP}
      />
      <LPCard
        lpName="RSHARE-mADA"
        totalSupply={totalSupplyRshareNativeLP}
        LPPriceUSD={rshareLPPriceUsd}
        marketCap={marketCapRshareLP}
      />
    </Cards>
  );
};

export default LPCards;
