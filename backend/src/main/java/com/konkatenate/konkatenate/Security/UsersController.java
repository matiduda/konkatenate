package com.konkatenate.konkatenate.Security;

import org.springframework.web.bind.annotation.RestController;

import com.konkatenate.konkatenate.KonkatenateUser.KonkatenateUserRepository;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    @GetMapping("/all")
    public String getUsers() {
        return "OK";
    }
}
