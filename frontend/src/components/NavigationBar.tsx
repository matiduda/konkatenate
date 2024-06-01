import { Container, Flex, Box, Button, Callout, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import logo from "../assets/konkatenate.svg";
import { CSSProperties, useEffect, useState } from "react";
import { isUserAuthenticated } from "../utils/isUserAuthenticated";
import Cookies from "universal-cookie"
import { API_URL, TOKEN_COOKIE_ID } from "../App";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { getUsername } from "../utils/getUsername";


export default function NavigationBar() {

    const [isServerResponding, setIsServerResponding] = useState(true);

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

    const checkServerResponding = () => {

        const pingServer = async () => {
            const pingEndpoint = API_URL + "/ping"


            const headers = new Headers({
                "Content-Type": "application/json"
            });

            let result: Response;

            try {
                result = await fetch(pingEndpoint, {
                    method: "GET",
                    headers: headers
                });
            } catch (e) {
                return false;
            }

            if (!result.ok) {
                return false;
            }

            const response = await result.json();

            return response.message === "PONG";
        };

        pingServer().then((value: boolean) => {
            setIsServerResponding(value)
        });
    }

    useEffect(checkServerResponding, []);

    return (
        <Container className="NavigationBar">
            {
                isServerResponding
                    ? (<></>)
                    : (<Callout.Root style={{
                        marginBottom: 30
                    }}>
                        <Callout.Icon>
                            <InfoCircledIcon />
                        </Callout.Icon>
                        <Callout.Text>
                            Konkarenate servers are down now, some services wont' work
                        </Callout.Text>
                    </Callout.Root>
                    )
            }



            <Flex direction="row" justify="between" align="center">
                <Box>
                    <img src={logo} style={logoStyle} onClick={() => navigate("/")} />
                </Box>

                {
                    isUserAuthenticated() ? (
                        <Box>
                            <Text>Hi, <strong>{getUsername()}</strong></Text>
                        </Box>
                    ) : (<></>)
                }

                <Box>
                    <Flex justify="end" align="center" style={{
                        columnGap: 10
                    }}>
                        {
                            isUserAuthenticated()
                                ? (
                                    <>
                                        <Button onClick={() => navigate("/users")}>Users</Button>
                                        <Button onClick={() => navigate("/games")}>Games</Button>
                                        <Button onClick={() => navigate("/upload")}>Upload</Button>
                                        <Button onClick={handleLogout}>Logout</Button>
                                    </>
                                )
                                : (
                                    <>
                                        <Button onClick={() => navigate("/games")}>Games</Button>
                                        <Button onClick={() => navigate("/login")}>Login</Button>
                                    </>
                                )
                        }

                    </Flex>
                </Box>
            </Flex>
        </Container>
    )
}