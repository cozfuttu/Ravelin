/* eslint no-nested-ternary: "off" */
import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { Button, useModal } from "uikit";
import UnlockButton from "components/UnlockButton";
import { useHunter } from "state/hooks";
import { useApproveHunter } from "hooks/useApprove";
import { getBalanceNumber } from "utils/formatBalance";
import useTokenBalance from "hooks/useTokenBalance";
import BuyModal from "./BuyModal";
import BigNumber from "bignumber.js";

const Action = styled.div`
  padding-top: 16px;
`;

interface NftCardActionsProps {
  account?: string;
}

const CardActions: React.FC<NftCardActionsProps> = ({ account }) => {
  const [requestedApproval, setRequestedApproval] = useState(false);
  const { userData, hunterPrice, hunterPaidToken, pause } = useHunter();
  const { onApprove } = useApproveHunter(hunterPaidToken);

  const { allowanceHunter } = userData;
  const isApproved = new BigNumber(allowanceHunter).isGreaterThan(0);

  const cakeBalance = getBalanceNumber(useTokenBalance(hunterPaidToken));

  const canUserAffordHunter = cakeBalance >= hunterPrice;

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true);
      await onApprove();
      setRequestedApproval(false);
    } catch (e) {
      console.error(e);
    }
  }, [onApprove]);

  const [onPresentBuyModal] = useModal(<BuyModal />);

  const renderApprovalOrBuyButton = () => {
    return isApproved ? (
      <Button
        fullWidth
        disabled={!canUserAffordHunter || pause}
        onClick={onPresentBuyModal}
      >
        {!pause ? canUserAffordHunter
          ? "Buy Hunter"
          : `You need ${hunterPrice} RAV-mADA Occam LP to buy a hunter.`
          : "Paused!"}
      </Button>
    ) : (
      <Button
        mt="8px"
        fullWidth
        disabled={requestedApproval}
        onClick={handleApprove}
      >
        Approve Contract
      </Button>
    );
  };

  return (
    <Action>
      {!account ? (
        <UnlockButton mt="8px" fullWidth />
      ) : (
        renderApprovalOrBuyButton()
      )}
    </Action>
  );
};

export default CardActions;
