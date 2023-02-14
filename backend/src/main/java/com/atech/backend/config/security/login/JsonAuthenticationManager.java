package com.atech.backend.config.security.login;

import com.atech.backend.config.security.PBKDF2Util;
import com.atech.backend.repository.user.User;
import com.atech.backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@Component
@RequiredArgsConstructor
@Slf4j
public class JsonAuthenticationManager implements AuthenticationManager {

    private final UserService userService;
    private final PBKDF2Util pbkdf2Util;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        UserDetails userDetails = userService.findByUserId((String) authentication.getPrincipal());
        boolean validated = false;

        try {
            validated = pbkdf2Util.validatePassword((String)authentication.getCredentials(), userDetails.getPassword());
        } catch (NoSuchAlgorithmException e) {
            throw new BadCredentialsException("Not Found User");
        } catch (InvalidKeySpecException e) {
            throw new BadCredentialsException("Not Found User");
        }

        if(!validated){
            throw new BadCredentialsException("비밀번호 불일치.");
        }

        return new UsernamePasswordAuthenticationToken(userDetails
                , userDetails.getPassword()
                , userDetails.getAuthorities());
    }
}