package com.konkatenate.konkatenate.Game;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.konkatenate.konkatenate.Login.LoginDto;
import com.konkatenate.konkatenate.Security.AuthResponseDTO;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/games")
public class GameController {

    @Autowired
    private GameService gameService;

    @GetMapping()
    @ResponseBody
    public ResponseEntity<GameResponseDTO> games(
            @RequestBody(required = false) FilterGamesRequestDTO filterGamesRequest) {

        List<Game> games = filterGamesRequest != null
                ? gameService.getGames(filterGamesRequest.getTitle())
                : gameService.getAllGames();

        List<GameInfo> gameInfoList = games
                .stream()
                .map(game -> new GameInfo(game.getStorageId(), game.getTitle(), game.getDescription()))
                .collect(Collectors.toList());

        GameResponseDTO gameResponseDto = new GameResponseDTO(gameInfoList);

        return new ResponseEntity<GameResponseDTO>(gameResponseDto, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<MessageResponseDTO> games(
            @RequestParam("game") MultipartFile file,
            @RequestParam("cover") MultipartFile cover,
            @RequestParam("title") String title,
            @RequestParam("description") String description)
            throws IllegalStateException, IOException {
        // Requires:
        // - .zip with game contents (as working HTML page)
        // - cover picture
        // - title, description, author, category, etc.
        gameService.createGame(file, title, description, cover);

        MessageResponseDTO responseDto = new MessageResponseDTO("Successfully uploaded game");

        return new ResponseEntity<MessageResponseDTO>(responseDto, HttpStatus.OK);
    }

    @DeleteMapping()
    public ResponseEntity<MessageResponseDTO> games() {
        gameService.deleteAllGames();

        MessageResponseDTO responseDto = new MessageResponseDTO("Successfully deleted all games");

        return new ResponseEntity<MessageResponseDTO>(responseDto, HttpStatus.OK);
    }
}
