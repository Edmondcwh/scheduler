import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools';

const styles = {
    global: props => ({
        body: {
            bg: mode("#C3DEDD","#88BDBC") (props),
        }
    })
}

const theme = extendTheme({
    styles,
})

export default theme;