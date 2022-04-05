import styled from "styled-components"

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: #F2F2F2;
  position: relative;
  margin: 1em auto;
  width: 12em; height: 20.784em;
  border-radius: 1.2em/.6em;

  :before, :after {
    position: absolute;
    width: inherit; height: inherit;
    border-radius: inherit;
    background: inherit;
    content: '';
    z-index: -1;
  }
  :before {
    transform: rotate(60deg);
  }
  :after {
    transform: rotate(-60deg);
  }
`

const HexCard = ({ children }) => {
  return (
    <Card>
      {children}
    </Card>
  )
}

export default HexCard