

import { Box, Container, Flex } from "@radix-ui/themes";
import { useLocation } from "react-router-dom";
import { STATIC_URL } from "../App";

export default function PlayPage() {
    const { state } = useLocation();
    const { id } = state; // Read values passed on state

    const gameSrc = (gameId: string) => `${STATIC_URL}games/${gameId}/index.html`;

    console.log(id);
    return (
        <Container>
            <h1>Browse games</h1>
            <iframe src={gameSrc(id)} title="description" style={{
                height: "70vh",
                width: "70vh"
            }}></iframe>
        </Container>
    )
}