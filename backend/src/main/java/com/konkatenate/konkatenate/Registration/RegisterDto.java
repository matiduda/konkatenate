package com.konkatenate.konkatenate.Registration;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Setter
@NoArgsConstructor
public class RegisterDto {
    private String username;
    private String password;
}
