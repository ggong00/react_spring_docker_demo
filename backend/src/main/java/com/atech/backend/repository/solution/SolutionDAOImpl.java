package com.atech.backend.repository.solution;

import com.atech.backend.repository.license.License;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
@Slf4j
public class SolutionDAOImpl implements SolutionDAO {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public List<Solution> findAllSolution() {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT * FROM solution ");

        List<Solution> solutionList = jdbcTemplate.query(
                sql.toString(),
                new BeanPropertyRowMapper<>(Solution.class)
        );

        return solutionList;
    }

    @Override
    public void updateSolution(Solution solution) {
        log.info("solution {}", solution);

        StringBuffer sql = new StringBuffer();
        sql.append(" UPDATE solution ");
        sql.append(" SET solution_name = ? ");
        sql.append(" where solution_id = ? ");

        jdbcTemplate.update(
                sql.toString(),
                solution.getSolutionName(),
                solution.getSolutionId()
        );
    }

    @Override
    public void deleteSolution(Solution solution) {
        StringBuffer sql = new StringBuffer();
        sql.append(" DELETE from solution ");
        sql.append(" where solution_id = ? ");

        jdbcTemplate.update(
                sql.toString(),
                solution.getSolutionId()
        );
    }

    @Override
    public void insertSolution(Solution solution) {
        StringBuffer sql = new StringBuffer();
        sql.append(" INSERT INTO solution (solution_name)");
        sql.append(" values(?) ");

        jdbcTemplate.update(
                sql.toString(),
                solution.getSolutionName()
        );
    }

    @Override
    public List<Detail> findAllDetail(Long solutionId) {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT * FROM detail ");
        sql.append(" where solution_id = ? ");

        List<Detail> detailList = jdbcTemplate.query(
                sql.toString(),
                new BeanPropertyRowMapper<>(Detail.class),
                solutionId
        );

        return detailList;
    }

    @Override
    public void updateDetail(Detail detail) {
        log.info("update detail {}", detail);

        StringBuffer sql = new StringBuffer();
        sql.append(" UPDATE detail ");
        sql.append(" SET contents = ? ");
        sql.append(" where detail_id = ? ");

        jdbcTemplate.update(
                sql.toString(),
                detail.getContents(),
                detail.getDetailId()
        );
    }

    @Override
    public void deleteDetail(Detail detail) {
        StringBuffer sql = new StringBuffer();
        sql.append(" DELETE from detail ");
        sql.append(" where detail_id = ? ");

        jdbcTemplate.update(
                sql.toString(),
                detail.getDetailId()
        );
    }

    @Override
    public void insertDetail(Long solutionId, Detail detail) {
        log.info("insert detail {}", detail);
        log.info("insert solutionId {}", solutionId);

        StringBuffer sql = new StringBuffer();
        sql.append(" INSERT INTO detail (solution_id, contents)");
        sql.append(" values(?,?) ");

        jdbcTemplate.update(
                sql.toString(),
                solutionId,
                detail.getContents()
        );
    }

    @Override
    public List<License> findAllLicense(Long solutionId) {
        StringBuffer sql = new StringBuffer();
        sql.append(" SELECT * FROM license ");
        sql.append(" where solution_id = ? ");

        List<License> licenseList = jdbcTemplate.query(
                sql.toString(),
                new BeanPropertyRowMapper<>(License.class),
                solutionId
        );

        return licenseList;
    }

    @Override
    public void updateLicense(License license) {
        StringBuffer sql = new StringBuffer();
        sql.append(" UPDATE license SET");
        sql.append(" basic = ?, ");
        sql.append(" premium = ?, ");
        sql.append(" custom = ?, ");
        sql.append(" type = ? ");
        sql.append(" where license_id = ? ");

        jdbcTemplate.update(
                sql.toString(),
                license.getBasic(),
                license.getPremium(),
                license.getCustom(),
                license.getType(),
                license.getLicenseId()
        );
    }

    @Override
    public void deleteLicense(License license) {
        StringBuffer sql = new StringBuffer();
        sql.append(" DELETE from license ");
        sql.append(" where license_id = ? ");

        jdbcTemplate.update(
                sql.toString(),
                license.getLicenseId()
        );
    }

    @Override
    public void insertLicense(Long solutionId, License license) {
        StringBuffer sql = new StringBuffer();
        sql.append(" INSERT INTO license (solution_id, basic, premium, custom, type)");
        sql.append(" values(?,?,?,?,?) ");

        jdbcTemplate.update(
                sql.toString(),
                solutionId,
                license.getBasic(),
                license.getPremium(),
                license.getCustom(),
                license.getType()
        );
    }
}
