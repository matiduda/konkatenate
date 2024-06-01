import { Avatar, Box, Button, Card, Container, Flex, Strong, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { API_URL } from "../App";
import { useNavigate } from "react-router-dom";
import { GameInfo } from "./GamesPage";
import spinner from "../assets/loading.svg";

export type UserInfo = {
    id: number,
    username: string,
    email: string,
    created: number,
    roles: string[],
    uploadedGames: GameInfo[],
}

export default function UsersPage() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(true);

    const [userList, setUserList] = useState<UserInfo[]>(new Array(5).map((_, i) => ({
        username: "User",
        roles: ["USER"]
    }) as UserInfo));

    const getGames = async (): Promise<UserInfo[]> => {
        const gamesEndpoint = API_URL + "/users";

        const headers = new Headers({
            "Content-Type": "application/json"
        });

        const result = await fetch(gamesEndpoint, {
            method: "GET",
            headers: headers
        });

        const json = await result.json();

        console.log(json);

        return json.users?.map((user, i) => ({
            id: i,
            username: user.username,
            email: user.email,
            created: user.creationDate,
            roles: user.roles,
            uploadedGames: user.uploadedGames,
        }) as UserInfo);
    }

    useEffect(() => {
        getGames().then(gameList => {
            setUserList(gameList);
            setLoading(false);
        })
    }, []);

    const renderDescription = () => {
        return (
            <Box>
                <Card size="2">
                    <Flex justify="between" align="center">
                        <Box width="75px" />
                        <Flex flexGrow="1" justify="between" maxWidth="44%">
                            <Text as="span" size="3">
                                <Strong>Username</Strong>
                            </Text>
                            <Text as="span" size="3">
                                <Strong>Roles</Strong>
                            </Text>
                        </Flex>
                        <Text as="span" size="3">
                            <Strong>Uploaded</Strong>
                        </Text>
                        <Box width="50px" />
                    </Flex>
                </Card>
            </Box>
        )
    }

    const renderGameCard = (info: UserInfo) => {
        return (
            <Box key={info.id} width="70vh">
                <Card size="2">
                    <Flex justify="between" align="center">
                        <Avatar
                            size="3"
                            radius="full"
                            fallback={info.username[0]}
                        />
                        <Flex flexGrow="1" justify="between" maxWidth="45%">
                            <Text as="span" size="3">
                                <Strong>{info.username}</Strong>
                            </Text>
                            <Text as="span" size="3">
                                {info.roles.join(', ')}
                            </Text>
                        </Flex>
                        <Text as="span" size="3">
                            <Strong>{info.uploadedGames.length}</Strong>
                        </Text>
                        <Button onClick={() => navigate('/user', { state: { username: info.username } })}>Profile</Button>
                    </Flex>
                </Card>
            </Box>
        )
    }

    return (
        <Container>
            <h1>Users</h1>
            <Flex direction="row">
                <Box flexGrow="1" />
                <Flex direction="column">
                    {renderDescription()}
                    {loading ?
                        (<>
                            <Flex width="700px" height="500px" justify="center" align="center">
                                <img src={spinner} width="50px" />
                            </Flex>
                        </>) : userList.map(game => renderGameCard(game))}
                </Flex>
                <Box flexGrow="1" />
            </Flex>
        </Container>
    )
}