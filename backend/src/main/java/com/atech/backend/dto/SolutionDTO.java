package com.atech.backend.dto;

import com.atech.backend.repository.question.Question;
import com.atech.backend.repository.solution.Detail;
import com.atech.backend.repository.license.License;
import com.atech.backend.repository.solution.Solution;
import lombok.*;

import java.util.List;

@Data
public class SolutionDTO {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @ToString
    public static class SolutionReq{
        private Long solutionId;
        private String solutionName;
        private List<Detail> detail;
        private List<License> license;

        public Solution toEntity(){
            return Solution.builder()
                    .solutionId(this.solutionId)
                    .solutionName(this.solutionName)
                    .detail(this.detail)
                    .license(this.license)
                    .build();
        }
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class SolutionRes{
        private Long solutionId;
        private String solutionName;
        private String imgPass;
        private List<Detail> detail;
        private List<License> license;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @Builder
    @NoArgsConstructor
    public static class SolutionGroupRes{
        private Long solutionId;
        private String solutionName;
        private String group1_1;
        private String contents;
        private String group1_2;
        private String basic;
        private String premium;
        private String custom;
        private String type;
    }
}
