import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { polygon, polygonMumbai } from 'wagmi/chains'

export const wagmiConfig = getDefaultConfig({
  appName: 'Hackrons',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Get from walletconnect.com
  chains: [polygon, polygonMumbai],
})
