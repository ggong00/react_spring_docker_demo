package com.atech.backend.service.solution;

import com.atech.backend.dto.SolutionDTO;
import com.atech.backend.repository.solution.Solution;

import java.util.List;

public interface SolutionService {

    List<SolutionDTO.SolutionRes> findALl();
    void update(SolutionDTO.SolutionReq solutionReq);
    void insert(SolutionDTO.SolutionReq solutionReq);
}
