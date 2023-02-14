package com.atech.backend.repository.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
@Slf4j
public class UserDAOImpl implements UserDAO{

    private final JdbcTemplate jdbcTemplate;

    @Override
    public Optional<User> findByUserId(String userId) {
        log.info("userId {} ", userId);
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT t1.*,t2.role_name FROM user t1 ");
        sql.append(" INNER JOIN role t2 ON  (t1.role_id = t2.role_id) ");
        sql.append(" WHERE t1.user_id = ? ");

        List<User> user = jdbcTemplate.query(sql.toString(), new RowMapper<User>() {
            @Override
            public User mapRow(ResultSet rs, int rowNum) throws SQLException {
                User user = (new BeanPropertyRowMapper<>(User.class)).mapRow(rs, rowNum);
                Role role = (new BeanPropertyRowMapper<>(Role.class)).mapRow(rs, rowNum);
                user.setRole(role);

                return user;
            }
        }, userId);

        if (user.size() == 0) {
            return Optional.empty();
        }

        return Optional.of(user.get(0));
    }

    @Override
    public Optional<User> userDuplChk(User user) {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT * FROM user WHERE ");
        sql.append(" email = ? ");

        Optional<User> optionalUser;

        try {
            User result  = jdbcTemplate.queryForObject(sql.toString(),
                    new BeanPropertyRowMapper<>(User.class),
                    user.getEmail()
            );

            optionalUser = Optional.of(result);

        } catch (DataAccessException e) {
            optionalUser = Optional.empty();
        }

        return optionalUser;

    }

    @Override
    public Optional<User> idDuplChk(User user) {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT * FROM user ");
        sql.append(" WHERE user_id = ? ");

        Optional<User> optionalUser;

        try {
            User result  = jdbcTemplate.queryForObject(sql.toString(),
                    new BeanPropertyRowMapper<>(User.class),
                    user.getUserId()
            );
            optionalUser = Optional.of(result);

        } catch (DataAccessException e) {
            optionalUser = Optional.empty();
        }

        log.info("optionalUser {}",optionalUser.isPresent());

        return optionalUser;
    }

    @Override
    public void join(User user) {
        StringBuffer sql = new StringBuffer();
        sql.append(" insert into user ");
        sql.append(" (user_id,user_pass,belong,name,position,tel,email,create_dtm) ");
        sql.append(" VALUES (?,?,?,?,?,?,?,NOW()) ");

        jdbcTemplate.update(
                sql.toString(),
                user.getUserId(),
                user.getUserPass(),
                user.getBelong(),
                user.getName(),
                user.getPosition(),
                user.getTel(),
                user.getEmail()
        );
    }

    @Override
    public Integer updateInfo(User user) {
        StringBuffer sql = new StringBuffer();
        sql.append(" UPDATE user SET");
        sql.append(" belong = ?, ");
        sql.append(" name = ?, ");
        sql.append(" position = ?, ");
        sql.append(" tel = ? ");
        sql.append(" where user_id = ? ");

        int resultCnt = jdbcTemplate.update(
                sql.toString(),
                user.getBelong(),
                user.getName(),
                user.getPosition(),
                user.getTel(),
                user.getUserId()
        );

        return resultCnt;
    }

    @Override
    public Integer updatePass(User user) {
        StringBuffer sql = new StringBuffer();
        sql.append(" UPDATE user SET");
        sql.append(" user_pass = ? ");
        sql.append(" where user_id = ? ");

        int resultCnt = jdbcTemplate.update(
                sql.toString(),
                user.getUserPass(),
                user.getUserId()
        );

        return resultCnt;
    }
}
