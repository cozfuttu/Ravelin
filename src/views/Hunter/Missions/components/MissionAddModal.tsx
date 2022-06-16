import BigNumber from "bignumber.js";
import React, { useCallback, useMemo, useState } from "react";
import { Button, Flex, Input, Modal } from "uikit";
import ModalActions from "components/ModalActions";
import TokenInput from "components/TokenInput";
import { getFullDisplayBalance } from "utils/formatBalance";
import { useAddMission } from "hooks/useAddMission";
import styled from "styled-components";

const StyledInput = styled(Input)`
  max-width: 250px;
`;

const initialState = {
  _missionId: "0",
  _multiple: "800",
  _needRarity: "0",
  _xp: "0",
  _doNotLoseXp: "10000",
  _cost: "0",
  _reward: "0",
  _paidToken: "0x0000000000000000000000000000000000000000",
  _earnedToken: "0x0000000000000000000000000000000000000000",
  _costAddress: "0x0000000000000000000000000000000000000000",
};

interface ModalProps {
  onDismiss?: () => void;
  currentMissionId: number;
}

const MissionAddModal: React.FC<ModalProps> = ({
  onDismiss,
  currentMissionId,
}) => {
  const [val, setVal] = useState(initialState);
  const [pendingTx, setPendingTx] = useState(false);

  const { onAddMission } = useAddMission(val._paidToken, val._earnedToken);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    setVal((prevVal) => {
      return { ...prevVal, [type]: e.target.value };
    });
  };

  return (
    <Modal title="Add a Mission!" onDismiss={onDismiss}>
      <Flex flexDirection="column" flexWrap="wrap" style={{ gap: "16px" }}>
        <StyledInput
          placeholder={`mission Id (currently at: ${currentMissionId + 1})`}
          onChange={(e) => handleChange(e, "_missionId")}
        />
        <StyledInput
          placeholder="multiple (default is 800)"
          onChange={(e) => handleChange(e, "_multiple")}
        />
        <StyledInput
          placeholder="need rarity (1,2,3,4)"
          onChange={(e) => handleChange(e, "_needRarity")}
        />
        <StyledInput
          placeholder="xp (4,8,12,16)"
          onChange={(e) => handleChange(e, "_xp")}
        />
        <StyledInput
          placeholder="do not lose xp (default 10000)"
          onChange={(e) => handleChange(e, "_doNotLoseXp")}
        />
        <StyledInput
          placeholder="cost (enter without decimals)"
          onChange={(e) => handleChange(e, "_cost")}
        />
        <StyledInput
          placeholder="reward (enter without decimals)"
          onChange={(e) => handleChange(e, "_reward")}
        />
        <StyledInput
          placeholder="paid token address"
          onChange={(e) => handleChange(e, "_paidToken")}
        />
        <StyledInput
          placeholder="earned token address"
          onChange={(e) => handleChange(e, "_earnedToken")}
        />
        <StyledInput
          placeholder="cost address (the wallet where paid tokens go)"
          onChange={(e) => handleChange(e, "_costAddress")}
        />
      </Flex>
      <ModalActions>
        <Button variant="secondary" onClick={onDismiss}>
          Cancel
        </Button>
        <Button
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true);
            try {
              await onAddMission(
                val._missionId,
                val._multiple,
                val._needRarity,
                val._xp,
                val._doNotLoseXp,
                val._cost,
                val._reward,
                val._costAddress
              );
            } catch (e) {
              console.log("An error occured while depositing: ", e);
            } finally {
              setPendingTx(false);
              onDismiss();
            }
          }}
        >
          {pendingTx ? "Pending Confirmation" : "Confirm"}
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default MissionAddModal;
