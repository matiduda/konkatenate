import { Container, Flex, Box, Button } from "@radix-ui/themes";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/konkatenate.svg";
import { CSSProperties } from "react";

export default function NavigationBar() {
    const navigate = useNavigate();

    const logoStyle: CSSProperties = {
        height: "30px",
        cursor: "pointer"
    }

    return (
        <Container>
            <Flex direction="row" justify="between">
                <Box>
                    <img src={logo} style={logoStyle} onClick={() => navigate("/")} />
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