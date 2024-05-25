import { Container, Flex, Skeleton, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { API_URL } from "../App";
import { useLocation } from "react-router-dom";
import { UserInfo } from "./UsersPage";

export default function UserPage() {
    const { state } = useLocation();
    const { username } = state; // Read values passed on state

    const [userInfo, setUserInfo] = useState<UserInfo>({
        username: "User",
        id: 0,
        roles: [],
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
        };

        return info;
    }

    useEffect(() => {
        loadUser().then(info => {
            setUserInfo(info);
            setLoading(false);
        })
    }, []);

    return (
        <Container>
            <Skeleton loading={loading}>
                <Text>{userInfo.username}</Text>
                <Text>{userInfo.roles}</Text>
            </Skeleton>
        </Container>
    )
}