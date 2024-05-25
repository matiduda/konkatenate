package com.konkatenate.konkatenate.Game;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import net.lingala.zip4j.ZipFile;
import net.lingala.zip4j.exception.ZipException;

@Service
public class GameService {

    @Autowired
    GameRepository repository;

    @Value("${gamestorage.dir}")
    private String gameStorageLocation;

    public String createGame(MultipartFile file, String title, String description, MultipartFile coverImage)
            throws IllegalStateException, IOException {
        String gameStorageId = getStorageId(title);
        String gameStoragePath = getGameStoragePath(gameStorageId);

        Game game = Game.builder().title(title).description(description).storageId(gameStorageId).build();

        // From
        // https://stackoverflow.com/questions/39851296/how-to-unzip-an-uploaded-zip-file-using-spring-in-java
        File zip = File.createTempFile(UUID.randomUUID().toString(), "temp");
        FileOutputStream o = new FileOutputStream(zip);
        IOUtils.copy(file.getInputStream(), o);
        o.close();

        try {
            ZipFile zipFile = new ZipFile(zip);
            zipFile.extractAll(gameStoragePath);

            if (!Files.exists(Paths.get(gameStoragePath + "/index.html"))) {
                zipFile.close();
                throw new Error("Game zip does not contanin index.html");
            }

            zipFile.close();
        } catch (ZipException e) {
            e.printStackTrace();
        } finally {
            zip.delete();
        }

        Path coverImageStoragePath = Path.of(gameStoragePath + "/cover.jpg");
        Files.copy(coverImage.getInputStream(), coverImageStoragePath, StandardCopyOption.REPLACE_EXISTING);

        // TODO: Check if zip contains index.html

        repository.save(game);

        return null;
    }

    // From "My Game " produces "my-game"
    public String getStorageId(String title) {
        return title.trim().replaceAll("\\s+", "-").toLowerCase();
    }

    private String getGameStoragePath(String storageId) {
        return gameStorageLocation + "/" + storageId.toString();
    }

    public List<Game> getAllGames() {
        return repository.findAll();
    }

    public List<Game> getGames(String title) {
        return repository.findByTitle(title);
    }

    private void deleteGameFromStorage(Game game) {
        String storagePath = getGameStoragePath(game.getStorageId());

        if (!Files.exists(Paths.get(storagePath))) {
            return;
        }

        try {
            FileUtils.deleteDirectory(new File(storagePath));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void deleteAllGames() {
        List<Game> allGames = repository.findAll();

        allGames.forEach(game -> {
            repository.delete(game);

            if (game.getStorageId() == null) {
                return;
            }

            deleteGameFromStorage(game);
        });
    }
}
