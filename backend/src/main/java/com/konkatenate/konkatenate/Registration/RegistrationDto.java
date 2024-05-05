package com.konkatenate.konkatenate.Registration;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Setter
@NoArgsConstructor
public class RegistrationDto {
    private Long id;
    private String username;
    private String email;
    private String password;
}
