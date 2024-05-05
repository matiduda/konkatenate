package com.konkatenate.konkatenate.Game;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {

    Optional<Game> findByTitle(String title);

}
