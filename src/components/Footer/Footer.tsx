import styled from "styled-components";

const FooterDiv = styled.footer`
  width: 100%;
  min-height: 195px;
  margin-top: 100px;
  background-color: #2D3A4A;
  position: relative;
  text-align: center;

  @media (max-width: 1680px) {
    display: none;
  }
`

const FooterText = styled.div`
  display: inline-block;
  font-family: 'Inter';
  font-size: 12px;
  color: #9D9D9D;
`

const Container = styled.div`
  max-width: 80%;
  width: 900px;
  display: flex;
  gap: 16px;
  margin: 0 auto;
  align-items: center;
`
/* 
const FooterImage = styled.img`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
` */

const Footer = ({ ...props }) => {
  return (
    <FooterDiv {...props} >
      <Container>
        <FooterText>
          Copyright © Ravcube Finance 2022
        </FooterText>
        <img src="images/logos/milkomedaBanner.png" width={488} alt="Logo" />
        <a href="/audit.pdf" style={{ color: "#9D9D9D", fontWeight: 'bold', fontFamily: 'Inter', zIndex: '99999' }}>AUDIT</a>
      </Container>
      {/*       <FooterImage src="images/logos/milkomedaBanner.webp" alt="Milkomeda Banner" />
 */}    </FooterDiv>
  )
}

export default Footer