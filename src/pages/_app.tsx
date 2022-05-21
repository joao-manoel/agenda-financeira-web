import '../styles/global.css'
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app'
import { WalletProvider } from '../hooks/useWallet'
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </WalletProvider>
  )
}

export default MyApp
