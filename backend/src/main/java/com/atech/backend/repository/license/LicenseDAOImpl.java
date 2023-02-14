package com.atech.backend.repository.license;

import com.atech.backend.repository.solution.Solution;
import com.atech.backend.repository.user.Role;
import com.atech.backend.repository.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
@RequiredArgsConstructor
@Slf4j
public class LicenseDAOImpl implements LicenseDAO{

    final private JdbcTemplate jdbcTemplate;

    @Override
    public Integer createLicense(MyLicense myLicense) {
        StringBuffer sql = new StringBuffer();
        sql.append(" INSERT INTO my_license ");
        sql.append(" (user_id,solution_id,site_id,site_pass,site_url,start_date,end_date) ");
        sql.append(" VALUES(?,?,?,?,?,?,?) ");

        int resultCnt = jdbcTemplate.update(
                sql.toString(),
                myLicense.getUser().getUserId(),
                myLicense.getSolution().getSolutionId(),
                myLicense.getSiteId(),
                myLicense.getSitePass(),
                myLicense.getSiteUrl(),
                myLicense.getStartDate(),
                myLicense.getEndDate()
        );

        return resultCnt;
    }

    @Override
    public List<MyLicense> findMyLicense(String userId) {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT t1.*, t2.name, t2.belong, t2.`position`, t3.solution_name FROM my_license t1 ");
        sql.append(" INNER JOIN user t2 on (t1.user_id = t2.user_id) ");
        sql.append(" INNER JOIN solution t3 on (t1.solution_id = t3.solution_id) ");
        sql.append(" WHERE t1.user_id = ?");

        List<MyLicense> myLicenseList = jdbcTemplate.query(sql.toString(), new RowMapper<MyLicense>() {
            @Override
            public MyLicense mapRow(ResultSet rs, int rowNum) throws SQLException {
                MyLicense myLicense = (new BeanPropertyRowMapper<>(MyLicense.class)).mapRow(rs, rowNum);
                Solution solution = (new BeanPropertyRowMapper<>(Solution.class)).mapRow(rs, rowNum);
                User user = (new BeanPropertyRowMapper<>(User.class)).mapRow(rs, rowNum);
                myLicense.setUser(user);
                myLicense.setSolution(solution);

                return myLicense;
            }
        }, userId);

        return myLicenseList;
    }
}
