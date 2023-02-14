package com.atech.backend.dto;

import com.atech.backend.mail.MailDto;
import com.atech.backend.repository.license.MyLicense;
import com.atech.backend.repository.solution.Solution;
import com.atech.backend.repository.user.User;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
public class LicenseDTO {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class MyLicenseRes {
        private Long myLicenseId;
        private String name;
        private String belong;
        private String position;
        private String solutionName;
        private String siteId;
        private String sitePass;
        private String siteUrl;
        private String startDate;
        private String endDate;
        private boolean status;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @ToString
    @SuppressWarnings("unchecked")
    public static class MyLicenseReq {
        private Long solutionId;
        private Long licenseQuestionId;
        private String userId;
        private String email;
        private String siteId;
        private String sitePass;
        private String siteUrl;
        private String mailTitle;
        private String message;
        private List<MultipartFile> attachFileList = new ArrayList<MultipartFile>();

        public MyLicense toEntity(){
            Solution solution = new Solution();
            solution.setSolutionId(this.solutionId);
            User user = new User();
            user.setUserId(this.userId);
            LocalDateTime startData = LocalDateTime.now();
            LocalDateTime endData = startData.plusDays(15);

            return MyLicense.builder()
                    .solution(solution)
                    .user(user)
                    .siteId(this.siteId)
                    .sitePass(this.sitePass)
                    .siteUrl(this.siteUrl)
                    .startDate(startData)
                    .endDate(endData)
                    .build();
        }
    }
}
