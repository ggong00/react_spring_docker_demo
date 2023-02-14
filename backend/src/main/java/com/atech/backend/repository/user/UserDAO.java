package com.atech.backend.repository.user;

import com.atech.backend.dto.UserDTO;

import java.util.Optional;

public interface UserDAO {
    Optional<User> findByUserId(String userId);

    Optional<User> userDuplChk(User user);
    Optional<User> idDuplChk(User user);
    void join(User user);

    Integer updateInfo(User user);
    Integer updatePass(User user);
}
