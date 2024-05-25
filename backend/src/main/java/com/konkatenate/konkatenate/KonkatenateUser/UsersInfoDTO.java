package com.konkatenate.konkatenate.KonkatenateUser;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UsersInfoDTO {
    private List<UserInfo> users;
}
