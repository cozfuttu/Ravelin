import { MenuEntry } from 'uikit'

const config: MenuEntry[] = [
  {
    label: 'HOME',
    color: '#ededed',
    href: '/',
  },
  {
    label: 'FARMS',
    color: '#ededed',
    href: '/farm',
  },
  {
    label: 'BOARDROOM',
    color: '#ededed',
    href: '/boardroom',
  },
  {
    label: 'BOND',
    color: '#ededed',
    href: '/bond',
  },
  {
    label: 'BRIDGE',
    color: '#ededed',
    items: [
      {
        label: 'Multichain',
        href: 'https://app.multichain.org/#/router'
      },
      {
        label: 'Celer',
        href: 'https://cbridge.celer.network/#/transfer'
      }
    ]
  },
  {
    label: 'DOCS',
    color: '#ededed',
    href: 'https://ravelin-finance.gitbook.io/ravelin-finance/',
  },
]

export const socials = [
  {
    label: 'Telegram',
    icon: 'TelegramIcon',
    href: 'https://t.me/ravelinfinance',
  },
  {
    label: 'Twitter',
    icon: 'TwitterIcon',
    href: 'https://twitter.com/RavelinFinance',
  },
]

export default config
