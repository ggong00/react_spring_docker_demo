package com.atech.backend.repository.solution;

import com.atech.backend.dto.SolutionDTO;
import com.atech.backend.repository.license.License;

import java.util.List;

public interface SolutionDAO {

    List<Solution> findAllSolution();
    void updateSolution(Solution solution);
    void deleteSolution(Solution solution);
    void insertSolution(Solution solution);
    List<Detail> findAllDetail(Long solutionId);
    void updateDetail(Detail detail);
    void deleteDetail(Detail detail);
    void insertDetail(Long SolutionId, Detail detail);
    List<License> findAllLicense(Long solutionId);
    void updateLicense(License license);
    void deleteLicense(License license);
    void insertLicense(Long SolutionId, License license);

}
