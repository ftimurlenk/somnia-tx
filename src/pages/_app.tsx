import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import {
  RainbowKitProvider,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains'; // Sepolia'yı test için tutmaya devam edelim
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// --- ADIM 1: ÖZEL AĞIMIZI TANIMLIYORUZ ---
const somniaShannon = {
  id: 50312, // Chain ID
  name: 'Somnia Shannon', // Ağa bir isim veriyoruz
  nativeCurrency: {
    name: 'Somnia Test Token',
    symbol: 'STT', // Sembol
    decimals: 18, // Standart ondalık basamak sayısı, gerekirse değiştirin
  },
  rpcUrls: {
    default: {
      http: ['https://dream-rpc.somnia.network/'], // RPC adresi
    },
  },
  blockExplorers: {
    default: {
      name: 'Shannon Explorer',
      url: 'https://shannon-explorer.somnia.network', // Block Explorer adresi
    },
  },
  testnet: true, // Bu bir test ağıdır
};


// --- ADIM 2: YAPILANDIRMAYI GÜNCELLİYORUZ ---

// Kendi WalletConnect Project ID'nizi buraya yapıştırın.
const projectId = 'SIZIN_WALLETCONNECT_PROJECT_IDNIZ';

const config = getDefaultConfig({
  appName: 'Sıralı Etkileşim Aracı',
  projectId: projectId,
  // 'chains' dizisine özel ağımızı ekliyoruz
  chains: [somniaShannon, sepolia],
  ssr: true, // Next.js için
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;