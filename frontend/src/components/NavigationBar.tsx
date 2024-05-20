import { Container, Flex, Box, Button } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import logo from "../assets/konkatenate.svg";
import { CSSProperties } from "react";
import { isUserAuthenticated } from "../utils/isUserAuthenticated";
import Cookies from "universal-cookie"
import { TOKEN_COOKIE_ID } from "../App";


export default function NavigationBar() {
    const navigate = useNavigate();

    const logoStyle: CSSProperties = {
        height: "30px",
        cursor: "pointer"
    }

    const handleLogout = () => {
        const cookies = new Cookies();
        cookies.remove(TOKEN_COOKIE_ID);
        navigate("/");
    }

    return (
        <Container>
            <Flex direction="row" justify="between">
                <Box>
                    <img src={logo} style={logoStyle} onClick={() => navigate("/")} />
                </Box>
                <Box>
                    <Flex justify="end" style={{
                        columnGap: 10
                    }}>
                        <Button onClick={() => navigate("/games")}>Browse</Button>
                        {
                            isUserAuthenticated()
                                ? (<>
                                    <Button onClick={() => navigate("/upload")}>Upload</Button>
                                    <Button onClick={handleLogout}>Logout</Button>
                                </>

                                )
                                : (<Button onClick={() => navigate("/login")}>Login</Button>)
                        }

                    </Flex>
                </Box>
            </Flex>
        </Container>
    )
}