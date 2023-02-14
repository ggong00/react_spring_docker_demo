package com.atech.backend.service.License;

import com.atech.backend.dto.LicenseDTO;
import com.atech.backend.dto.QuestionDTO;
import com.atech.backend.mail.MailDto;
import com.atech.backend.mail.MailService;
import com.atech.backend.repository.license.LicenseDAO;
import com.atech.backend.repository.license.MyLicense;
import com.atech.backend.repository.license_question.LicenseQuestionDAO;
import com.atech.backend.repository.question.Question;
import com.atech.backend.repository.question.QuestionDAO;
import com.atech.backend.repository.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class LicenseServiceImpl implements LicenseService {

    final private LicenseDAO licenseDAO;
    final private LicenseQuestionDAO licenseQuestionDAO;
    final private MailService mailService;

    @Override
    public boolean createLicense(LicenseDTO.MyLicenseReq myLicenseReq) throws MessagingException, IOException {

        //라이선스 지급
        Integer resultCnt1 = licenseDAO.createLicense(myLicenseReq.toEntity());
        Integer resultCnt2 = licenseQuestionDAO.changeStatus(Question.STATUS_SUCCESS, myLicenseReq.getLicenseQuestionId());

        //메일 전송
        if(resultCnt1 + resultCnt2 == 2) {
            String licenseHTML = mailService.createLicenseHTML(myLicenseReq);
            MailDto mailDto = new MailDto();
            mailDto.setEmail(myLicenseReq.getEmail());
            mailDto.setMailTitle(myLicenseReq.getMailTitle());
            mailDto.setMessage(licenseHTML);
            mailDto.setAttachFileList(myLicenseReq.getAttachFileList());

            mailService.sendMail(mailDto);
        }

        return resultCnt1 + resultCnt2 == 2 ? true : false;
    }

    @Override
    public List<LicenseDTO.MyLicenseRes> findMyLicense() {
        User principal = (User) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        log.info("principal.getUserId() {} ", principal.getUserId());

        List<MyLicense> myLicenseList = licenseDAO.findMyLicense(principal.getUserId());
        List<LicenseDTO.MyLicenseRes> licenseResList = myLicenseList.stream()
                .map(MyLicense::toMyLicenseRes)
                .collect(Collectors.toList());

        return licenseResList;
    }

}
