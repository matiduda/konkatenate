package com.konkatenate.konkatenate.KonkatenateUser;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class KonkatenateUserDto {
    private Long id;
    private String username;
    private String email;
    private String password;
}
