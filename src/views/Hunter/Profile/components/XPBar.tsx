/* eslint react/self-closing-comp: "off" */
import React from 'react'
import styled from 'styled-components'

const Bar = styled.div`
    width: 100%;
    background: ${(props) => props.theme.card.background};
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 32px;
    width: 160px;
`

const XpBarInner = styled.div`
    height: 100%;
    width: 100%;
    border: 1px solid #313131;
    border-radius: 12px;
    background-color: #592af375;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`

const XpBarFill = styled.div`
    background-color: #00E0A0;
    width: 20%;
    transition: all 0.3s ease-out;
    height: 100%;
`

interface XpBarProps {
    xp: number
    needXpToLevelUp: number
}

const XpBar: React.FC<XpBarProps> = ({ xp, needXpToLevelUp }) => {
    const xpPercentage = `${(xp / needXpToLevelUp) * 100}%`
    return (
        <Bar>
            <XpBarInner>
                <XpBarFill style={{ width: xpPercentage }}></XpBarFill>
            </XpBarInner>
        </Bar>
    )
}

export default XpBar