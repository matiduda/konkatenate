import { Container, Flex, Box, Button, Callout } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import logo from "../assets/konkatenate.svg";
import { CSSProperties, useEffect, useReducer, useState } from "react";
import { isUserAuthenticated } from "../utils/isUserAuthenticated";
import Cookies from "universal-cookie"
import { API_URL, TOKEN_COOKIE_ID } from "../App";
import { InfoCircledIcon } from "@radix-ui/react-icons";


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
                    : (<Callout.Root>
                        <Callout.Icon>
                            <InfoCircledIcon />
                        </Callout.Icon>
                        <Callout.Text>
                            Konkarenate servers are down now, some services wont' work
                        </Callout.Text>
                    </Callout.Root>
                    )
            }



            <Flex direction="row" justify="between">
                <Box>
                    <img src={logo} style={logoStyle} onClick={() => navigate("/")} />
                </Box>
                <Box>
                    <Flex justify="end" style={{
                        columnGap: 10
                    }}>
                        <Button onClick={() => navigate("/games")}>Games</Button>
                        {
                            isUserAuthenticated()
                                ? (<>
                                    <Button onClick={() => navigate("/users")}>Users</Button>
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