import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "uikit";
import { SvgProps } from "uikit/components/Svg";
import * as IconModule from "uikit/widgets/Menu/icons";
import config, { socials } from "./config";
import MenuLink from "uikit/widgets/Menu/MenuLink";
import { LinkLabel, MenuEntry } from "./MenuEntry";

const OuterContainer = styled.div<{ isOpen?: boolean }>`
  display: flex;
  //  padding-top: 80px;
  flex-direction: column;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  max-width: ${({ isOpen }) => (isOpen ? "100%" : "0")};
  transition: max-width 0.3s ease-out;
  height: 100vh;
  overflow: hidden;
  background-image: url("images/other/menubg.png");
  background-repeat: no-repeat;
  background-position: right top;
  background-size: 400px;
  transform: rotate(0deg);
  background-color: #00000040;
  z-index: 10;
`;

const ItemsContainer = styled.div`
  padding-top: 48px;
  display: flex;
  padding-right: 64px;
  max-height: 520px;
  margin-right: -32px;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 12px;
  align-items: flex-end;
  align-self: flex-end;
  z-index: 999;
  font-family: "Inter", sans-serif;
`;

const SocialContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 32px;
  margin-left: 32px;
`;

const AccordionDivider = styled.div`
  background: linear-gradient(
    270deg,
    rgba(0, 122, 190, 1) 0%,
    rgba(0, 122, 190, 0) 100%
  );
  width: 50%;
  min-height: 2px;
  margin-top: 16px;
  margin-right: -32px;
`;

const Icons = IconModule as unknown as { [key: string]: React.FC<SvgProps> };

interface Props {
  onClose: () => void;
  isOpen?: boolean;
}

const MenuMobile: React.FC<Props> = ({ onClose, isOpen }) => {
  const [items, setItems] = useState(config);
  useEffect(() => {
    if (isOpen === false) return;
    setItems(config);
  }, [isOpen]);
  return (
    <OuterContainer onClick={onClose} isOpen={isOpen}>
      <ItemsContainer onClick={(e) => e.stopPropagation()}>
        {items.map((entry) => {
          const calloutClass = entry.calloutClass
            ? entry.calloutClass
            : undefined;
          if (entry.items)
            return (
              <>
                <MenuEntry
                  key={entry.label}
                  className={calloutClass}
                  onClick={() => {
                    setItems(entry.items);
                  }}
                >
                  <LinkLabel>{entry.label.toUpperCase()}</LinkLabel>
                </MenuEntry>
                <AccordionDivider />
              </>
            );
          return (
            <>
              <MenuEntry key={entry.label} className={calloutClass}>
                <MenuLink
                  onClick={onClose}
                  href={entry.href}
                  style={{ textDecoration: "none" }}
                >
                  <LinkLabel>{entry.label.toUpperCase()}</LinkLabel>
                </MenuLink>
              </MenuEntry>
              <AccordionDivider />
            </>
          );
        })}
        <SocialContainer>
          {socials.map((social, index) => {
            const Icon = Icons[social.icon];
            const iconProps = {
              width: social.icon === "TelegramIcon" ? "28px" : "36px",
              color: "#ffffff",
              style: { cursor: "pointer" },
            };
            const mr = index < socials.length - 1 ? "20px" : 0;

            return (
              <Link
                external
                key={social.label}
                href={social.href}
                aria-label={social.label}
                mr={mr}
              >
                <Icon {...iconProps} />
              </Link>
            );
          })}
        </SocialContainer>
      </ItemsContainer>
    </OuterContainer>
  );
};

export default MenuMobile;
