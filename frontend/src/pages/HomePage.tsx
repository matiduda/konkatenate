import { Container, Flex } from "@radix-ui/themes";
import GameCarousel from "../components/GameCarousel";
import VideoShowcase from "../components/VideoShowcase";

export default function HomePage() {
    return (
        <>
            <Container>
                <Flex width="100%" justify="center">
                    <h3>
                        Check out what's currently played
                    </h3>
                </Flex>
                <GameCarousel />
            </Container>
            <VideoShowcase />
        </>
    )
}