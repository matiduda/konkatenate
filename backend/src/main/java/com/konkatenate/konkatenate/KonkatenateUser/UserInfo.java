package com.konkatenate.konkatenate.KonkatenateUser;

import java.util.Date;
import java.util.List;

import com.konkatenate.konkatenate.Game.GameInfo;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserInfo {
    private String username;
    private String email;
    private Date creationDate;
    private List<String> roles;
    private List<GameInfo> uploadedGames;
}
