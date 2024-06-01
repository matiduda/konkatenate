package com.konkatenate.konkatenate.Game;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.konkatenate.konkatenate.KonkatenateUser.KonkatenateUser;
import com.konkatenate.konkatenate.KonkatenateUserRole.KonkatenateUserRoleRepository;
import com.konkatenate.konkatenate.Login.LoginDto;
import com.konkatenate.konkatenate.Security.AuthResponseDTO;
import com.konkatenate.konkatenate.Security.CustomUserDetailsService;

import lombok.extern.slf4j.Slf4j;

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
@Slf4j
public class GameController {

    @Autowired
    private GameService gameService;

    @Autowired
    private CustomUserDetailsService userService;

    @GetMapping()
    @ResponseBody
    public ResponseEntity<GameResponseDTO> games(
            @RequestBody(required = false) FilterGamesRequestDTO filterGamesRequest) {

        List<Game> games = filterGamesRequest != null
                ? gameService.getGames(filterGamesRequest.getTitle())
                : gameService.getAllGames();

        List<GameInfo> gameInfoList = games
                .stream()
                .map(game -> new GameInfo(game.getStorageId(), game.getTitle(), game.getDescription(),
                        game.getUploader().getUsername()))
                .collect(Collectors.toList());

        GameResponseDTO gameResponseDto = new GameResponseDTO(gameInfoList);

        return new ResponseEntity<GameResponseDTO>(gameResponseDto, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<MessageResponseDTO> games(
            @RequestParam("game") MultipartFile file,
            @RequestParam("cover") MultipartFile cover,
            @RequestParam("title") String title,
            @RequestParam("uploader") String uploaderUsername,
            @RequestParam("description") String description)
            throws IllegalStateException, IOException {
        // Requires:
        // - .zip with game contents (as working HTML page)
        // - cover picture
        // - title, description, author, category, etc.

        List<Game> existingGames = gameService.getGames(title);

        if (!existingGames.isEmpty()) {
            MessageResponseDTO responseDto = new MessageResponseDTO("Game with a given title already exists");
            return new ResponseEntity<MessageResponseDTO>(responseDto, HttpStatus.BAD_REQUEST);
        }

        KonkatenateUser uploader = userService.findByName(uploaderUsername);

        if (uploader == null) {
            MessageResponseDTO responseDto = new MessageResponseDTO("Uploader " + uploaderUsername + " does not exist");
            return new ResponseEntity<MessageResponseDTO>(responseDto, HttpStatus.BAD_REQUEST);
        }

        var currentUserName = SecurityContextHolder.getContext().getAuthentication();

        log.info(currentUserName.toString());

        try {
            gameService.createGame(file, title, description, cover, uploader);
        } catch (Error e) {
            MessageResponseDTO responseDto = new MessageResponseDTO(e.getMessage());
            return new ResponseEntity<MessageResponseDTO>(responseDto, HttpStatus.BAD_REQUEST);
        }

        MessageResponseDTO responseDto = new MessageResponseDTO("Successfully uploaded game");
        return new ResponseEntity<MessageResponseDTO>(responseDto, HttpStatus.OK);
    }

    @PostMapping("/deleteSingle")
    public ResponseEntity<MessageResponseDTO> deleteSingleGame(
            @RequestParam("id") String gameID,
            @RequestParam("uploader") String uploaderUsername) {

        Game game = gameService.getGameById(gameID);

        if (game == null) {
            MessageResponseDTO responseDto = new MessageResponseDTO("Game with id " + gameID + " does not exist");
            return new ResponseEntity<MessageResponseDTO>(responseDto, HttpStatus.BAD_REQUEST);
        }

        List<KonkatenateUser> currentUserList = userService.getAllUsersByUsername(uploaderUsername);
        if (currentUserList.size() == 0) {
            MessageResponseDTO responseDto = new MessageResponseDTO(
                    "User with username " + uploaderUsername + " does not exist");
            return new ResponseEntity<MessageResponseDTO>(responseDto, HttpStatus.BAD_REQUEST);
        }

        KonkatenateUser currentUser = currentUserList.get(0);

        if (!userService.isAdmin(currentUser)) {
            String gameUploaderUsername = game.getUploader().getUsername();
            if (!gameUploaderUsername.equals(uploaderUsername)) {
                MessageResponseDTO responseDto = new MessageResponseDTO(
                        "Uploader of game " + gameID + ", " + gameUploaderUsername + ", does not match current user "
                                + uploaderUsername);
                return new ResponseEntity<MessageResponseDTO>(responseDto, HttpStatus.BAD_REQUEST);
            }
        }

        gameService.deleteGame(game);

        MessageResponseDTO responseDto = new MessageResponseDTO("Successfully deleted game");
        return new ResponseEntity<MessageResponseDTO>(responseDto, HttpStatus.OK);
    }

    @DeleteMapping("/all")
    public ResponseEntity<MessageResponseDTO> games() {
        gameService.deleteAllGames();

        MessageResponseDTO responseDto = new MessageResponseDTO("Successfully deleted all games");

        return new ResponseEntity<MessageResponseDTO>(responseDto, HttpStatus.OK);
    }
}
