package com.konkatenate.konkatenate.Security;

import org.springframework.web.bind.annotation.RestController;

import com.konkatenate.konkatenate.Game.GameService;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/users")
public class UsersController {

        @Autowired
        private CustomUserDetailsService userDetailsService;

        @Autowired
        private GameService gameService;

        @GetMapping()
        @ResponseBody
        public ResponseEntity<UsersInfoDTO> getUsers(
                        @RequestParam(required = false) String username) {

                List<KonkatenateUser> users = username != null
                                ? userDetailsService.getAllUsersByUsername(username)
                                : userDetailsService.getAllUsers();

                List<UserInfo> mappedUsers = users
                                .stream()
                                .map(user -> new UserInfo(user.getUsername(), user.getEmail(), user.getCreationDate(),
                                                user.getRoles().stream().map(role -> role.getName())
                                                                .collect(Collectors.toList()),
                                                gameService.getGamesUploadedByUser(user)))
                                .collect(Collectors.toList());

                UsersInfoDTO usersInfoDTO = new UsersInfoDTO(mappedUsers);

                return new ResponseEntity<UsersInfoDTO>(usersInfoDTO, HttpStatus.OK);
        }

        @GetMapping("/makeAdmin")
        @ResponseBody
        public ResponseEntity<UsersInfoDTO> makeAdmin(
                        @RequestParam(required = false) String username) {

                List<KonkatenateUser> users = username != null
                                ? userDetailsService.getAllUsersByUsername(username)
                                : userDetailsService.getAllUsers();

                List<UserInfo> mappedUsers = users
                                .stream()
                                .map(user -> new UserInfo(user.getUsername(), user.getEmail(), user.getCreationDate(),
                                                user.getRoles().stream().map(role -> role.getName())
                                                                .collect(Collectors.toList()),
                                                gameService.getGamesUploadedByUser(user)))
                                .collect(Collectors.toList());

                UsersInfoDTO usersInfoDTO = new UsersInfoDTO(mappedUsers);

                return new ResponseEntity<UsersInfoDTO>(usersInfoDTO, HttpStatus.OK);
        }
}
