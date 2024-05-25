package com.konkatenate.konkatenate.Security;

import org.springframework.web.bind.annotation.RestController;

import com.konkatenate.konkatenate.KonkatenateUser.KonkatenateUser;
import com.konkatenate.konkatenate.KonkatenateUser.UserInfo;
import com.konkatenate.konkatenate.KonkatenateUser.UsersInfoDTO;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @GetMapping()
    @ResponseBody
    public ResponseEntity<UsersInfoDTO> getUsers(
            @RequestBody(required = false) String username) {

        List<KonkatenateUser> users = username != null
                ? userDetailsService.getAllUsersByUsername(username)
                : userDetailsService.getAllUsers();

        List<UserInfo> mappedUsers = users
                .stream()
                .map(user -> new UserInfo(user.getUsername(),
                        user.getRoles().stream().map(role -> role.getName()).collect(Collectors.toList())))
                .collect(Collectors.toList());

        UsersInfoDTO usersInfoDTO = new UsersInfoDTO(mappedUsers);

        return new ResponseEntity<UsersInfoDTO>(usersInfoDTO, HttpStatus.OK);
    }
}
