import { Container, Flex, Box, Button } from "@radix-ui/themes";
import { Link, useNavigate } from "react-router-dom";

export default function NavigationBar() {
    const navigate = useNavigate();

    return (
        <Container>
            <Flex direction="row" justify="between">
                <Box>
                    <Link to="/">konkatenate</Link>
                </Box>
                <Box>
                    <Flex justify="end">
                        <Button onClick={() => navigate("/signin")}>Sign in</Button>
                    </Flex>
                </Box>
            </Flex>
        </Container>
    )
}