package com.atech.backend.service.user;

import com.atech.backend.dto.LicenseDTO;
import com.atech.backend.dto.UserDTO;
import com.atech.backend.repository.user.User;

import javax.mail.MessagingException;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Optional;

public interface UserService {
    User findByUserId(String userId);
    boolean userDuplChk(UserDTO.UserReq userReq);
    boolean userDuplChk(LicenseDTO.MyLicenseReq myLicenseReq);

    boolean idDuplChk(UserDTO.UserReq userReq);
    UserDTO.UserInfoRes loginChk();
    void join(UserDTO.UserReq userReq) throws NoSuchAlgorithmException, InvalidKeySpecException;

    Integer updateInfo(UserDTO.UserReq userReq);
    Integer updatePass(UserDTO.UserReq userReq) throws NoSuchAlgorithmException, InvalidKeySpecException;

    void sendCodeMail(String to) throws MessagingException, IOException;
    boolean codeCheck(String code) throws MessagingException, IOException;
}
