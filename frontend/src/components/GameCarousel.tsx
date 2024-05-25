import { useEffect, useState } from "react";
import { GameInfo, getGames, getImageCover } from "../pages/GamesPage";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";

import spinner from "../assets/loading.svg";
import { Container, Flex } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

export default function GameCarousel() {
    const navgate = useNavigate();

    const [loading, setLoading] = useState<boolean>(true);

    const [gameList, setGameList] = useState<GameInfo[]>(new Array(5).map((_, i) => ({
        title: "Title",
        id: i.toString(),
        description: "Description"
    }) as GameInfo));

    useEffect(() => {
        getGames().then(gameList => {
            setGameList(gameList);
            setLoading(false);
        });
    }, []);

    const renderGame = (game: GameInfo) => {
        return (
            <Container style={{
                marginTop: 20,
                marginBottom: 20,
            }}>
                <SwiperSlide key={game.id}>
                    <div className="CarouselContainer">
                        <h3 className="CarouselTitle">{game.title}</h3>
                        <img
                            key={game.id}
                            src={getImageCover(game.id)}
                            className="CarouselImage"
                            onClick={() => navgate('/play', { state: { id: game.id, title: game.title } })}
                        >
                        </img>
                    </div>
                </SwiperSlide>
            </Container>
        )
    };

    if (loading) {
        return (
            <Flex width="1200px" height="400px" justify="center" align="center">
                <img src={spinner} width="50px" />
            </Flex>
        )
    }

    return (
        <Container style={{
            marginTop: 20,
            marginBottom: 20,
        }}>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                {gameList.map(game => renderGame(game))}
            </Swiper>
        </Container>
    )
}