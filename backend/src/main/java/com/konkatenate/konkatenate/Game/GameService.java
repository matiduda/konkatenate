package com.konkatenate.konkatenate.Game;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.konkatenate.konkatenate.KonkatenateApplication;

import net.lingala.zip4j.ZipFile;
import net.lingala.zip4j.exception.ZipException;

@Service
public class GameService {

    @Autowired
    GameRepository repository;

    @Value("${gamestorage.dir}")
    private String gameStorageLocation;

    public String uploadGameToFileSystem(MultipartFile file, String title) throws IllegalStateException, IOException {
        String gameStorageId = getStorageId(title);
        String gameStoragePath = getGameStoragePath(gameStorageId);

        Game game = Game.builder().title(title).storageId(gameStorageId).build();

        // From
        // https://stackoverflow.com/questions/39851296/how-to-unzip-an-uploaded-zip-file-using-spring-in-java
        File zip = File.createTempFile(UUID.randomUUID().toString(), "temp");
        FileOutputStream o = new FileOutputStream(zip);
        IOUtils.copy(file.getInputStream(), o);
        o.close();

        try {
            ZipFile zipFile = new ZipFile(zip);
            zipFile.extractAll(gameStoragePath);
            zipFile.close();
        } catch (ZipException e) {
            e.printStackTrace();
        } finally {
            zip.delete();
        }
        // TODO: Check if zip contains index.html

        repository.save(game);

        return null;
    }

    // From "My Game " produces "my-game"
    private String getStorageId(String title) {
        return title.trim().replaceAll("\\s+", "-").toLowerCase();
    }

    private String getGameStoragePath(String storageId) {
        return gameStorageLocation + "/" + storageId.toString();
    }
}
