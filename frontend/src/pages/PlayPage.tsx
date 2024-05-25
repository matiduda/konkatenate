

import { Box, Container, Flex } from "@radix-ui/themes";
import { useLocation } from "react-router-dom";
import { SERVER_STOMP_URL, STATIC_URL } from "../App";
import Chat from "../components/Chat";
import { StompProvider } from "../useStomp/Provider";

export default function PlayPage() {
    const { state } = useLocation();
    const { id, title } = state; // Read values passed on state

    const gameSrc = (gameId: string) => `${STATIC_URL}games/${gameId}/index.html`;

    return (
        <Container>
            <h1>{title || "Unnamed game"}</h1>
            <Flex direction="row" gap="2" justify="between">
                <iframe src={gameSrc(id)} title="description" className="GameIframe" frameBorder={0}></iframe>
                <Chat />
            </Flex>
        </Container>
    )
}