package com.atech.backend.repository.license;

import com.atech.backend.dto.LicenseDTO;
import com.atech.backend.repository.solution.Solution;
import com.atech.backend.repository.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MyLicense {
    private Long myLicenseId;
    private User user;
    private Solution solution;
    private String siteId;
    private String sitePass;
    private String siteUrl;
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    public LicenseDTO.MyLicenseRes toMyLicenseRes () {

        LocalDateTime plusDays = this.startDate.plusDays(15L);
        LocalDateTime now = LocalDateTime.now();
        System.out.println(this.endDate);

        return LicenseDTO.MyLicenseRes
                .builder()
                .myLicenseId(this.myLicenseId)
                .name(user.getName())
                .belong(user.getBelong())
                .position(user.getPosition())
                .solutionName(solution.getSolutionName())
                .siteId(this.siteId)
                .sitePass(this.sitePass)
                .siteUrl(this.siteUrl)
                .startDate(this.startDate.format(DateTimeFormatter.ISO_DATE))
                .endDate(this.endDate.format(DateTimeFormatter.ISO_DATE))
                .status(!now.isAfter(plusDays))
                .status(true)
                .build();
    }
}
