import styled from "styled-components";

const FooterDiv = styled.footer`
  width: 100vw;
  height: 195px;
  margin-top: 100px;
  background-color: #2D3A4A;
  position: relative;
  z-index: -1;
`

const FooterText = styled.div`
  font-family: 'Inter';
  font-size: 12px;
  color: #9D9D9D;
  position: absolute;
  top: 20%;
  left: 20%;
`

const Footer = ({ ...props }) => {
  return (
    <FooterDiv {...props} >
      <FooterText>
        Copyright © Ravelin Finance 2022
      </FooterText>
    </FooterDiv>
  )
}

export default Footer