package com.konkatenate.konkatenate.KonkatenateUser;

import java.util.List;

import com.konkatenate.konkatenate.KonkatenateUserRole.KonkatenateUserRole;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserInfo {
    private String username;
    private List<String> roles;
}
