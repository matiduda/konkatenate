import { Avatar, Box, Button, Card, Container, Flex, Skeleton, Strong, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { API_URL } from "../App";
import { useNavigate } from "react-router-dom";

export type UserInfo = {
    id: number,
    username: string,
    roles: string[],
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
            roles: user.roles,
        }) as UserInfo);
    }

    useEffect(() => {
        getGames().then(gameList => {
            setUserList(gameList);
            setLoading(false);
        })
    }, []);

    const renderGameCard = (info: UserInfo) => {
        return (
            <Box key={info.id} width="500px">
                <Skeleton loading={loading}>
                    <Card size="2">

                        <Flex justify="between" align="center">
                            <Avatar
                                size="3"
                                radius="full"
                                fallback={info.username[0]}
                            />
                            <Flex flexGrow="1" justify="between" maxWidth="50%">
                                <Text as="span" size="3">
                                    <Strong>{info.username}</Strong>
                                </Text>
                                <Text as="span" size="3">
                                    {info.roles.join(', ')}
                                </Text>
                            </Flex>
                            <Button onClick={() => navigate('/user', { state: { id: info.username } })}>Profile</Button>
                        </Flex>
                    </Card>
                </Skeleton>
            </Box>
        )
    }

    return (
        <Container>
            <h1>Users</h1>
            <Flex direction="row">
                <Box flexGrow="1" />
                <Flex direction="column">
                    {userList.map(game => renderGameCard(game))}
                </Flex>
                <Box flexGrow="1" />
            </Flex>
        </Container>
    )
}