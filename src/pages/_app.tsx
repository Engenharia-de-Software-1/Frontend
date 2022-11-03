import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { AgroI9Providers } from '../contexts'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <ChakraProvider>
      <AgroI9Providers>
        <Component {...pageProps} />
      </AgroI9Providers>
    </ChakraProvider>
  )
}

export default MyApp
