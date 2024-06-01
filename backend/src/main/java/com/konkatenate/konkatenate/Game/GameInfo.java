package com.konkatenate.konkatenate.Game;

import lombok.Data;

@Data
public class GameInfo {
    private String title;
    private String description;
    private String id;
    private String uploaderUsername;

    public GameInfo(String id, String title, String description, String uploaderUsername) {
        this.title = title;
        this.description = description;
        this.id = id;
        this.uploaderUsername = uploaderUsername;
    }
}
