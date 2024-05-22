package com.konkatenate.konkatenate.Game;

import lombok.Data;

@Data
public class GameInfo {
    private String title;
    private String description;
    private String id;

    public GameInfo(String id, String title, String description) {
        this.title = title;
        this.description = description;
        this.id = id;
    }
}
