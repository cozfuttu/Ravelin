/* eslint react/jsx-curly-brace-presence: "off" */
/* eslint no-nested-ternary: "off" */
/* eslint react/jsx-boolean-value: "off" */
import React, { useState } from 'react'
import styled from 'styled-components'
import { Modal, Text, Flex, Button } from 'uikit'
import { useBuyPolygalacticHunter } from 'hooks/useBuyPolygalacticHunter'
import ModalActions from 'components/ModalActions'
import Input, { InputProps } from 'components/Input'

const StyledTokenInput = styled.div``

const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[3]}px;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`

const NameInput: React.FC<InputProps> = ({ onChange, value }) => {
  return (
    <StyledTokenInput>
      <Input
        endAdornment={
          <StyledTokenAdornmentWrapper>
            <StyledSpacer />
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="My Hunter"
        value={value}
      />
    </StyledTokenInput>
  )
}

const Grid = styled.div`
  display: grid;
  max-width: 640px;
  max-height: 640px;
  margin-bottom: 240px;
`

interface BuyModalProps {
  onDismiss?: () => void
}

const BuyModal: React.FC<BuyModalProps> = ({ onDismiss }) => {
  const [pendingTx, setPendingTx] = useState(false)
  const [val, setVal] = useState('')
  const { onBuy } = useBuyPolygalacticHunter()

  const handleTextChange = (e) => {
    setVal(e.currentTarget.value)
  }

  const disabledCharacters = [' ', '@', '/', '+', '-', '*', '=', '(', 'é', '.', ',']

  /*   const doesContainDisabledCharacter = (target, pattern) => {
      let value = 0
      pattern.forEach((word) => {
        value += target.includes(word)
      })
      return value >= 1
    } */

  const containsDisabledCharacter = disabledCharacters.find((char) => val.includes(char)) === undefined

  return (
    <Modal title="Name your Hunter!" onDismiss={onDismiss}>
      <Grid>
        <Text>
          Note that your hunter&apos;s name can&apos;t contain space, and can&apos;t be longer than 12 characters.
        </Text>
        <Input onChange={handleTextChange} value={val} />
        <ModalActions>
          <Button
            mt="8px"
            fullWidth
            disabled={containsDisabledCharacter || val.length > 12 || val.length < 3 || pendingTx}
            onClick={async () => {
              try {
                setPendingTx(true)
                await onBuy(val)
              }
              catch (e) {
                console.log('An error occured while buying a hunter: ', e)
              }
              finally {
                setPendingTx(false)
              }
            }}
          >
            Confirm Buy
          </Button>
        </ModalActions>
      </Grid>
    </Modal>
  )
}

export default BuyModal
