import errorPage from '../../assets/error-page.svg';
import { Box, Button, Text } from '@chakra-ui/react';

interface ErrorProps {
    reloadCb: () => void;
    message: string;
}

const Error = (props: ErrorProps) => {
    return (
        <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' gap={3} m='2em' width='100%' height='100%'>
            <img className="error-img" src={errorPage} alt="Error" />
            <Text> {props.message} </Text>
            <Box className="reload-msg">
                {"Can you try again?"}
            </Box>
                <Button onClick={props.reloadCb} bgColor='#008080' color='white'>
                    {"Reload Page"}
                </Button>
        </Box>
    )
}

export default Error;