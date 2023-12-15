import { Grid, Container, Flex, Box, Button } from "@radix-ui/themes";
import { Link, useNavigate } from "react-router-dom";

export default function Navigation() {
    const navigate = useNavigate();

    return (
        <Grid gap="3" align="center">
            <Container size="3">
                <Flex direction="row">
                    <Box>
                        <Link to="/">konkatenate</Link>
                    </Box>
                    <Box width="100%">
                        <Flex justify="end">
                            <Button onClick={() => navigate("/signin")}>Sign in</Button>
                        </Flex>
                    </Box>
                </Flex>
            </Container>
        </Grid >
    )
}