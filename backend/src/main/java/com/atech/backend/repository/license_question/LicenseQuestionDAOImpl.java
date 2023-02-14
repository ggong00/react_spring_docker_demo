package com.atech.backend.repository.license_question;

import com.atech.backend.repository.question.Question;
import com.atech.backend.repository.solution.Solution;
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
public class LicenseQuestionDAOImpl implements LicenseQuestionDAO {

    final private JdbcTemplate jdbcTemplate;

    @Override
    public void insert(LicenseQuestion licenseQuestion, String type) {
        StringBuffer sql = new StringBuffer();
        sql.append(" INSERT INTO license_question ");
        sql.append(" (solution_id,user_id,title,`contents`,create_dtm,license_type) ");
        sql.append(" VALUES(?,?,?,?,NOW(),?) ");

        jdbcTemplate.update(
                sql.toString(),
                licenseQuestion.getSolution().getSolutionId(),
                licenseQuestion.getUser().getUserId(),
                licenseQuestion.getTitle(),
                licenseQuestion.getContents(),
                type
        );
    }
    @Override
    public List<LicenseQuestion> findAll(String status) {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT * FROM license_question t1 ");
        sql.append(" INNER JOIN solution t2 on t1.solution_id = t2.solution_id ");
        sql.append(" INNER JOIN user t3 on t1.user_id = t3.user_id ");
        sql.append(" WHERE res_yn like ? ");

        if(status.equals(LicenseQuestion.STATUS_ALL)) {
            status = "%%";
            sql.append(" AND res_yn != 'DELETE' ");
        }

        sql.append(" ORDER BY t1.create_dtm ");

        List<LicenseQuestion> questionList = jdbcTemplate.query(sql.toString(), new RowMapper<LicenseQuestion>() {
            @Override
            public LicenseQuestion mapRow(ResultSet rs, int rowNum) throws SQLException {
                LicenseQuestion licenseQuestion = (new BeanPropertyRowMapper<>(LicenseQuestion.class)).mapRow(rs, rowNum);
                Solution solution = (new BeanPropertyRowMapper<>(Solution.class)).mapRow(rs, rowNum);
                User user = (new BeanPropertyRowMapper<>(User.class)).mapRow(rs, rowNum);
                licenseQuestion.setSolution(solution);
                licenseQuestion.setUser(user);

                return licenseQuestion;
            }
        }, status);

        return questionList;
    }

    @Override
    public Integer changeStatus(String status, Long licenseQuestionId) {
        StringBuffer sql = new StringBuffer();
        sql.append(" UPDATE license_question ");
        sql.append(" SET res_yn = ? ");
        sql.append(" where license_question_id = ? ");

        int resultCnt = jdbcTemplate.update(sql.toString(), status, licenseQuestionId);

        return resultCnt;
    }

    @Override
    public Integer deleteQuestion(Long licenseQuestionId) {
        StringBuffer sql = new StringBuffer();
        sql.append(" UPDATE license_question ");
        sql.append(" SET res_yn = ? ");
        sql.append(" where license_question_id = ? ");

        return jdbcTemplate.update(sql.toString(), LicenseQuestion.STATUS_DELETE ,licenseQuestionId);
    }
}
