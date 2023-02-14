package com.atech.backend.service.solution;

import com.atech.backend.dto.SolutionDTO;
import com.atech.backend.repository.license.License;
import com.atech.backend.repository.solution.Detail;
import com.atech.backend.repository.solution.Solution;
import com.atech.backend.repository.solution.SolutionDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class SolutionServiceImpl implements SolutionService{

    final private SolutionDAO solutionDAO;

    @Override
    public List<SolutionDTO.SolutionRes> findALl() {
        //전체 솔루션 조회
        List<Solution> findList = solutionDAO.findAllSolution();

        //솔루션 디테일 / 라이선스 조회
        List<SolutionDTO.SolutionRes> solutionRes = findList.stream()
                .map(solution -> {
                    Solution newSolution = new Solution();
                    BeanUtils.copyProperties(solution, newSolution);
                    newSolution.setDetail(solutionDAO.findAllDetail(solution.getSolutionId()));
                    newSolution.setLicense(solutionDAO.findAllLicense(solution.getSolutionId()));
                    return newSolution.toSolutionRes();
                })
                .collect(Collectors.toList());

        return solutionRes;
    }

    @Override
    public void update(SolutionDTO.SolutionReq solutionReq) {
        //솔루션 수정
        solutionDAO.updateSolution(solutionReq.toEntity());

        //디테일 삭제
        List<Detail> allDetail = solutionDAO.findAllDetail(solutionReq.getSolutionId());
        List<Detail> deleteList = allDetail.stream().filter(oldDetail -> {
            boolean result = true;
            for (Detail newDetail : solutionReq.getDetail()) {
                if (oldDetail.getDetailId().equals(newDetail.getDetailId())) {
                    result = false;
                }
            }
            return result;
        }).collect(Collectors.toList());
        deleteList.stream().forEach(detail -> solutionDAO.deleteDetail(detail));

        //디테일 수정 / 추가
        solutionReq.getDetail().stream().forEach(detail -> {
            if(detail.getDetailId() > 0) {
                solutionDAO.updateDetail(detail);
            } else  {
                solutionDAO.insertDetail(solutionReq.getSolutionId(),detail);
            }
        });

        //라이선스 수정 / 추가? / 삭제?
        solutionReq.getLicense().stream().forEach(license -> {
            if(license.getLicenseId() > 0) {
                solutionDAO.updateLicense(license);
            } else  {
                solutionDAO.insertLicense(solutionReq.getSolutionId(),license);
            }
        });
    }

    @Override
    public void insert(SolutionDTO.SolutionReq solutionReq) {

    }
}
