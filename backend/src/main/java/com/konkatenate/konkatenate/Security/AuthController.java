package com.konkatenate.konkatenate.Security;

import org.springframework.web.bind.annotation.RestController;

import com.konkatenate.konkatenate.KonkatenateUser.KonkatenateUser;
import com.konkatenate.konkatenate.KonkatenateUser.KonkatenateUserRepository;
import com.konkatenate.konkatenate.KonkatenateUserRole.KonkatenateUserRole;
import com.konkatenate.konkatenate.KonkatenateUserRole.KonkatenateUserRoleRepository;
import com.konkatenate.konkatenate.Login.LoginDto;
import com.konkatenate.konkatenate.Registration.RegisterDto;
import com.konkatenate.konkatenate.Registration.RegistrationResponseDto;

import java.util.Date;
import java.util.List;

import org.apache.catalina.connector.Response;
import org.hibernate.sql.ast.tree.predicate.BooleanExpressionPredicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private AuthenticationManager authenticationManager;
    private KonkatenateUserRepository konkatenateUserRepository;
    private KonkatenateUserRoleRepository konkatenateUserRoleRepository;
    private PasswordEncoder passwordEncoder;
    private JWTGenerator tokenGenerator;

    public AuthController(AuthenticationManager authenticationManager,
            KonkatenateUserRepository konkatenateUserRepository,
            KonkatenateUserRoleRepository konkatenateUserRoleRepository, PasswordEncoder passwordEncoder,
            JWTGenerator tokenGenerator) {
        this.authenticationManager = authenticationManager;
        this.konkatenateUserRepository = konkatenateUserRepository;
        this.konkatenateUserRoleRepository = konkatenateUserRoleRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenGenerator = tokenGenerator;
    }

    @PostMapping("register")
    @ResponseBody
    public ResponseEntity<RegistrationResponseDto> register(@RequestBody RegisterDto registerDto) {
        if (konkatenateUserRepository.existsByUsername(registerDto.getUsername())) {
            return new ResponseEntity<>(new RegistrationResponseDto("User with this username already exists"),
                    HttpStatus.BAD_REQUEST);
        }

        if (konkatenateUserRepository.existsByEmail(registerDto.getEmail())) {
            return new ResponseEntity<>(new RegistrationResponseDto("User with this email already exists"),
                    HttpStatus.BAD_REQUEST);
        }

        KonkatenateUser user = new KonkatenateUser();

        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setCreationDate(new Date());

        List<KonkatenateUserRole> roles = konkatenateUserRoleRepository.findByName("USER");

        user.setRoles(roles);

        konkatenateUserRepository.save(user);

        return new ResponseEntity<>(new RegistrationResponseDto("Successfully registered"), HttpStatus.OK);
    }

    @PostMapping("login")
    @ResponseBody
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDto loginDto) {
        Boolean existsByUsername = konkatenateUserRepository.existsByUsername(loginDto.getUsernameOrEmail());
        Boolean existsByEmail = konkatenateUserRepository.existsByEmail(loginDto.getUsernameOrEmail());

        if (!existsByEmail && !existsByUsername) {
            return new ResponseEntity<AuthResponseDTO>(
                    new AuthResponseDTO(null,
                            "Provided credentials are incorrect"),
                    HttpStatus.BAD_REQUEST);
        }

        KonkatenateUser konkatenateUser = existsByEmail
                ? konkatenateUserRepository.findByEmail(loginDto.getUsernameOrEmail())
                : konkatenateUserRepository.findByUsername(loginDto.getUsernameOrEmail());

        if (konkatenateUser == null) {
            return new ResponseEntity<AuthResponseDTO>(
                    new AuthResponseDTO(null, "Critical error"), HttpStatus.BAD_REQUEST);
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(konkatenateUser.getUsername(), loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = tokenGenerator.generateToken(authentication);

        return new ResponseEntity<AuthResponseDTO>(new AuthResponseDTO(token, "Successfully logged in"), HttpStatus.OK);
    }
}
