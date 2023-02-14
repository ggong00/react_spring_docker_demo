package com.atech.backend.repository.solution;

import com.atech.backend.dto.SolutionDTO;
import com.atech.backend.repository.license.License;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Solution {
    private Long solutionId;
    private String solutionName;
    private String imgPass;
    private List<Detail> detail;
    private List<License> license;

    public SolutionDTO.SolutionRes toSolutionRes() {
        return SolutionDTO.SolutionRes
                .builder()
                .solutionId(this.solutionId)
                .solutionName(this.solutionName)
                .detail(this.detail)
                .license(this.license)
                .build();
    }
}
