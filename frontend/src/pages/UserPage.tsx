import { Avatar, Badge, Box, Button, Card, Code, Container, DataList, Flex, IconButton, Link, Skeleton, Strong, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { API_URL } from "../App";
import { useLocation, useNavigate } from "react-router-dom";
import { UserInfo } from "./UsersPage";
import { CopyIcon } from "@radix-ui/react-icons";
import spinner from "../assets/loading.svg";
import { GameInfo } from "./GamesPage";
import { getUsername } from "../utils/getUsername";

export default function UserPage() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const { username } = state; // Read values passed on state

    const [userInfo, setUserInfo] = useState<UserInfo>({
        username: "User",
        email: "email@google.com",
        created: 0,
        id: 0,
        roles: [],
        uploadedGames: [],
    })

    const [loading, setLoading] = useState<boolean>(true);

    const loadUser = async (): Promise<UserInfo> => {
        const gamesEndpoint = API_URL + "/users";

        const headers = new Headers({
            "Content-Type": "application/json"
        });

        const result = await fetch(gamesEndpoint + `?username=${username}`, {
            method: "GET",
            headers: headers,
        });

        const json = await result.json();

        console.log(json);

        const userInfo = json.users?.[0];

        if (!userInfo) {
            throw new Error("Could not find user " + username);
        }

        const info: UserInfo = {
            id: 0,
            username: userInfo.username,
            roles: userInfo.roles,
            email: userInfo.email,
            created: Date.parse(userInfo.creationDate),
            uploadedGames: userInfo.uploadedGames
        };

        return info;
    }

    useEffect(() => {
        loadUser().then(info => {
            setUserInfo(info);
            setLoading(false);
        })
    }, [loading]);

    const renderRoles = (roles: string[]) => {
        return roles.map(role => (
            <Badge color={role === "ADMIN" ? "red" : "blue"} variant="soft" radius="full" style={{ marginRight: 10 }}>
                {role}
            </Badge>
        ));
    }

    const removeGame = (gameId: string) => {
        console.log(gameId);

        const deleteGame = async (): Promise<void> => {
            const gamesEndpoint = API_URL + `/games/deleteSingle?id=${gameId}&uploader=${getUsername()}`;

            const result = await fetch(gamesEndpoint, {
                method: "POST",
            });

            const json = await result.json();

            return json.games;
        }

        deleteGame().then(() => {
            loadUser().then(info => {
                setUserInfo(info);
                setLoading(false);
            })
        })
    }

    const renderGameCard = (info: GameInfo) => {
        return (
            <Box key={info.id} >
                <Card size="2" >
                    <Flex width="700px" justify="between" align="center">
                        <Flex flexGrow="1" justify="between" maxWidth="45%">
                            <Text as="span" size="3">
                                <Strong>{info.title}</Strong>
                            </Text>
                            <Text as="span" size="3">
                                {info.description}
                            </Text>

                        </Flex>
                        <Button onClick={() => navigate('/play', { state: { id: info.id, title: info.title } })}>Play</Button>
                        {
                            info.uploaderUsername === getUsername() ? (
                                <Button onClick={() => removeGame(info.id)}>Remove</Button>
                            ) : (<></>)
                        }
                    </Flex>
                </Card>
            </Box >
        )
    }

    return (
        <Container minHeight="70vh">
            <Skeleton loading={loading}>
                <h1>User info</h1>
                <Flex justify="between">
                    <DataList.Root>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">ID</DataList.Label>
                            <DataList.Value>
                                <Flex align="center" gap="2">
                                    <Text>{userInfo.username}</Text>
                                    <IconButton
                                        size="1"
                                        aria-label="Copy value"
                                        color="gray"
                                        variant="ghost"
                                    >
                                        <CopyIcon />
                                    </IconButton>
                                </Flex>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">Joined</DataList.Label>
                            <DataList.Value>{userInfo.created}</DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">Email</DataList.Label>
                            <DataList.Value>
                                <Link href={`mailto:${userInfo.email}`}>{userInfo.email}</Link>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item align="center">
                            <DataList.Label minWidth="88px">Roles</DataList.Label>
                            <DataList.Value>
                                {renderRoles(userInfo.roles)}
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="88px">Uploaded games</DataList.Label>
                            <DataList.Value>{userInfo.uploadedGames.length}</DataList.Value>
                        </DataList.Item>
                    </DataList.Root>

                    <Flex direction="row" width="700px">
                        <Box flexGrow="1" />
                        <Flex direction="column" >
                            <h3>Uploaded games</h3>
                            {loading ?
                                (<>
                                    <Flex width="700px" height="500px" justify="center" align="center">
                                        <img src={spinner} width="50px" />
                                    </Flex>
                                </>) : userInfo.uploadedGames.length ? userInfo.uploadedGames.map(game => renderGameCard(game)) : "No games"}
                        </Flex>
                        <Box flexGrow="1" />
                    </Flex>
                </Flex>

            </Skeleton>
        </Container>
    )
}