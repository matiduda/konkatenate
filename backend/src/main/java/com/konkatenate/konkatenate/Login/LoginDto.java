package com.konkatenate.konkatenate.Login;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Setter
@NoArgsConstructor
public class LoginDto {
    private String usernameOrEmail;
    private String password;
}
