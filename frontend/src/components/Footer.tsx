import { Box, Container, Flex, Text } from "@radix-ui/themes";
import logo from "../assets/konkatenateFooter.svg";
import { Link, useNavigate } from "react-router-dom";

const logoStyle = {
    width: "250px"
}

export default function Footer() {
    const navigate = useNavigate();

    return (
        <Container>
            <Flex width="100%" justify="between" style={{
                gap: "200px",
                marginTop: "40px",
                marginBottom: "20px",
            }}>
                <Box flexGrow="1">
                    <img src={logo} style={logoStyle} onClick={() => navigate("/")} /><br></br>
                    <Text style={{
                        color: "#64B5DA",
                        fontSize: "11pt"
                    }}><i>All your games connected</i></Text>
                </Box>
                <Flex direction="column" gap="2">
                    <Link to="/games" className="FooterLink" style={{
                        color: "#303030"
                    }}>Browse games</Link>

                    <Link to="/upload" className="FooterLink" style={{
                        color: "#303030"
                    }}>Upload game</Link>
                </Flex>
                <Box>
                    <Link to="/users" className="FooterLink" style={{
                        color: "#303030"
                    }}>Users</Link>
                </Box>
            </Flex>

            <Box style={{
                marginBottom: "40px",
                fontSize: "10pt"
            }}>
                <Text style={{
                }}><i>Copyright 2024 Konkatenate inc.</i></Text>
            </Box>
        </Container >
    )
}