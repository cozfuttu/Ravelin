import { MenuEntry } from "uikit";

const config: MenuEntry[] = [
  {
    label: "HOME",
    color: "#ededed",
    href: "/",
  },
  {
    label: "FARMS",
    color: "#ededed",
    href: "/farm",
  },
  {
    label: "BOARDROOM",
    color: "#ededed",
    href: "/boardroom",
  },
  {
    label: "BOND",
    color: "#ededed",
    href: "/bond",
  },
  {
    label: "HUNTER",
    color: "#ededed",
    items: [
      {
        label: "Profile",
        href: "/profile",
      },
      {
        label: "Missions",
        href: "/missions",
      },
    ],
  },
  {
    label: "BRIDGE",
    color: "#ededed",
    items: [
      {
        label: "Multichain",
        href: "https://app.multichain.org/#/router",
      },
      {
        label: "Celer",
        href: "https://cbridge.celer.network/#/transfer",
      },
    ],
  },
  {
    label: "DOCS",
    color: "#ededed",
    href: "https://docs.ravcube.finance/",
  },
];

export const socials = [
  {
    label: "Telegram",
    icon: "TelegramIcon",
    href: "https://t.me/ravelinfinance",
  },
  {
    label: "Twitter",
    icon: "TwitterIcon",
    href: "https://twitter.com/RavcubeFinance",
  },
  {
    label: "Discord",
    icon: "DiscordIcon",
    href: "https://discord.gg/j5vGH5F2u5",
  },
  {
    label: "Github",
    icon: "GithubIcon",
    href: "https://github.com/PulsarFarm/RavelinFinance",
  },
];

export default config;
