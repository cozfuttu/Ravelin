import React, { useState } from "react";
import { Button, Flex, Input, Modal, Text } from "uikit";
import ModalActions from "components/ModalActions";
import { useAddMission } from "hooks/useAddMission";
import styled from "styled-components";
import { useSetMission } from "hooks/useSetMission";
import { useSetTokenAllow } from "hooks/useSetTokenAllow";

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
  _token1: "0x0000000000000000000000000000000000000000",
  _token2: "0x0000000000000000000000000000000000000000",
  _cooldown: "0",
  _token1And2: false
};

interface ModalProps {
  onDismiss?: () => void;
  currentMissionId: number;
  isMissionSet?: boolean;
  isCooldown?: boolean
}

const MissionAddModal: React.FC<ModalProps> = ({
  onDismiss,
  currentMissionId,
  isMissionSet = false,
  isCooldown = false,
}) => {
  const [val, setVal] = useState(initialState);
  const [pendingTx, setPendingTx] = useState(false);

  const { onAddMission } = useAddMission(val._paidToken, val._earnedToken);
  const { onSetMission } = useSetMission(val._paidToken, val._earnedToken)
  const { onSetTokenAllow } = useSetTokenAllow()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    setVal((prevVal) => {
      return { ...prevVal, [type]: e.target.value };
    });
  };

  return (
    <Modal title={isMissionSet ? "Update a Mission" : "Add a Mission!"} onDismiss={onDismiss}>
      <Flex flexDirection="column" flexWrap="wrap" style={{ gap: "16px" }}>
        <StyledInput
          placeholder={isCooldown ? 'token 1 address' : `mission Id (currently at: ${currentMissionId + 1})`}
          onChange={(e) => handleChange(e, isCooldown ? "_token1" : "_missionId")}
        />
        <StyledInput
          placeholder={isCooldown ? 'token 2 address' : "multiple (default is 800)"}
          onChange={(e) => handleChange(e, isCooldown ? "_token2" : "_multiple")}
        />
        <StyledInput
          placeholder={isCooldown ? 'cooldown (seconds)' : "need rarity (1,2,3,4)"}
          onChange={(e) => handleChange(e, isCooldown ? "_cooldown" : "_needRarity")}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          {isCooldown && <Text style={{ textAlign: 'center' }}>is playable: </Text>}
          <StyledInput
            placeholder={isCooldown ? '' : "xp (10,20,30,40)"}
            type={isCooldown ? 'checkbox' : 'text'}
            onChange={(e) => handleChange(e, isCooldown ? "_token1And2" : "_xp")}
            style={{ maxWidth: isCooldown && '40px' }}
          />
        </div>
        {!isCooldown &&
          <>
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
          </>
        }
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
              isMissionSet
                ? await onSetMission(
                  val._missionId,
                  val._multiple,
                  val._needRarity,
                  val._xp,
                  val._doNotLoseXp,
                  val._cost,
                  val._reward,
                  val._costAddress
                )
                : isCooldown ? await onSetTokenAllow(
                  val._token1,
                  val._token2,
                  val._cooldown,
                  val._token1And2
                )
                  : await onAddMission(
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
