import { ChakraProvider, ColorModeProvider, extendTheme } from '@chakra-ui/react'
import {  createClient, dedupExchange, fetchExchange, Provider } from 'urql'
import {cacheExchange} from "@urql/exchange-graphcache"
import '../Scheduler.css';


import { CSSReset } from '@chakra-ui/core';
import theme from '../utils/theme';




function MyApp({ Component, pageProps }) {
  
  
  return (
   
      <ChakraProvider theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
            
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    
  )
}

export default MyApp
