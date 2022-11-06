import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { AgroI9Providers } from '../contexts'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../services/queryClient/config'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <AgroI9Providers>
          <Component {...pageProps} />
        </AgroI9Providers>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
