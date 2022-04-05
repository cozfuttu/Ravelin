import { Login } from '../WalletModal/types'

export interface LangType {
  code: string
  language: string
}

export interface Profile {
  username?: string
  image?: string
  profileLink: string
  noProfileLink: string
  showPip?: boolean
}

export interface PushedProps {
  isPushed: boolean
}

export interface NavTheme {
  background: string
  hover: string
}

export interface MenuSubEntry {
  label: string
  href?: string
  color?: string
  calloutClass?: string
  target?: string
  isHeader?: boolean
}

export interface MenuEntry {
  label: string
  icon?: string
  items?: MenuSubEntry[]
  href?: string
  calloutClass?: string
  initialOpenState?: boolean
  color?: string
}

export interface PanelProps {
  account?: string
  login: Login
  profile?: Profile
  logout: () => void
  isDark: boolean
  toggleTheme: (isDark: boolean) => void
  cakePriceUsd?: number
  GbntPriceUsd?: number
  currentLang: string
  langs: LangType[]
  setLang: (lang: LangType) => void
  links: Array<MenuEntry>
  priceLink: string
}

export interface NavProps extends PanelProps {
  account?: string
  login: Login
  profile?: Profile
  logout: () => void
}
