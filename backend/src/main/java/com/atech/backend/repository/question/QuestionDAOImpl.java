package com.atech.backend.repository.question;

import com.atech.backend.dto.QuestionDTO;
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
public class QuestionDAOImpl implements QuestionDAO{

    final private JdbcTemplate jdbcTemplate;

    @Override
    public void insert(Question question) {
        StringBuffer sql = new StringBuffer();
        sql.append(" INSERT INTO question ");
        sql.append(" (solution_id,belong,name,position,tel,email,title,`contents`,create_dtm) ");
        sql.append(" VALUES(?,?,?,?,?,?,?,?,NOW()) ");

        log.info("question {}", question);

        jdbcTemplate.update(
                sql.toString(),
                question.getSolution().getSolutionId(),
                question.getBelong(),
                question.getName(),
                question.getPosition(),
                question.getTel(),
                question.getEmail(),
                question.getTitle(),
                question.getContents()
        );
    }
    @Override
    public List<Question> findAll(String status) {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT * FROM question t1 ");
        sql.append(" INNER JOIN solution t2 on t1.solution_id = t2.solution_id ");
        sql.append(" WHERE res_yn like ? ");

        if(status.equals(Question.STATUS_ALL)) {
            status = "%%";
            sql.append(" AND res_yn != 'DELETE' ");
        }

        sql.append(" ORDER BY t1.create_dtm ");

        List<Question> questionList = jdbcTemplate.query(sql.toString(), new RowMapper<Question>() {
            @Override
            public Question mapRow(ResultSet rs, int rowNum) throws SQLException {
                Question question = (new BeanPropertyRowMapper<>(Question.class)).mapRow(rs, rowNum);
                Solution solution = (new BeanPropertyRowMapper<>(Solution.class)).mapRow(rs, rowNum);
                question.setSolution(solution);

                return question;
            }
        }, status);

        return questionList;
    }

    @Override
    public Integer changeStatus(String status, Long questionId) {
        StringBuffer sql = new StringBuffer();
        sql.append(" UPDATE question ");
        sql.append(" SET res_yn = ? ");
        sql.append(" where question_id = ? ");

        int resultCnt = jdbcTemplate.update(sql.toString(), status, questionId);

        return resultCnt;
    }

    @Override
    public Integer deleteQuestion(Long questionId) {
        StringBuffer sql = new StringBuffer();
        sql.append(" UPDATE question ");
        sql.append(" SET res_yn = ? ");
        sql.append(" where question_id = ? ");

        return jdbcTemplate.update(sql.toString(), Question.STATUS_DELETE ,questionId);
    }
}
