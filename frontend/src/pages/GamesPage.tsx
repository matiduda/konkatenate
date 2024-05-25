import { Box, Button, Card, Container, Flex, Inset, Skeleton, Strong, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { API_URL, STATIC_URL } from "../App";
import { render } from "react-dom";
import { Description, Title } from "@radix-ui/react-toast";
import { useNavigate } from "react-router-dom";

export type GameInfo = {
    title: string,
    id: string,
    description: string,
}

export const getImageCover = (gameId: string) => `${STATIC_URL}games/${gameId}/cover.jpg`;

export const getGames = async (): Promise<GameInfo[]> => {
    const gamesEndpoint = API_URL + "/games";

    const headers = new Headers({
        "Content-Type": "application/json"
    });

    const result = await fetch(gamesEndpoint, {
        method: "GET",
        headers: headers
    });

    const json = await result.json();

    return json.games;
}

export default function GamesPage() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(true);

    const [gameList, setGameList] = useState<GameInfo[]>(new Array(5).map((el, i) => ({
        title: "Title",
        id: i.toString(),
        description: "Description"
    }) as GameInfo));

    useEffect(() => {
        getGames().then(gameList => {
            setGameList(gameList);
            setLoading(false);
        })
    }, []);

    const renderGameCard = (info: GameInfo) => {
        return (
            <Box key={info.id} maxWidth="300px" minWidth={"300px"}>
                <Skeleton loading={loading}>
                    <Card size="2">
                        <Inset clip="padding-box" side="top" pb="current">
                            <img
                                src={getImageCover(info.id)}
                                alt="Bold typography"
                                style={{
                                    display: 'block',
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: 140,
                                    backgroundColor: 'var(--gray-5)',
                                }}
                            />
                        </Inset>
                        <Text as="p" size="3">
                            <Strong>{info.title}</Strong>
                        </Text>
                        <Text as="p" size="3" my="3">
                            {info.description}
                        </Text>
                        <Flex justify="end">
                            <Button onClick={() => navigate('/play', { state: { id: info.id, title: info.title } })}>Play</Button>
                        </Flex>
                    </Card>
                </Skeleton>
            </Box>
        )
    }

    return (
        <Container>
            <h1>Browse games</h1>
            <Flex>
                <Box width="250px"></Box>
                <Flex wrap="wrap" justify="center" gap="6">
                    {gameList.map(game => renderGameCard(game))}
                </Flex>
                <Box width="250px"></Box>
            </Flex>
        </Container>
    )
}