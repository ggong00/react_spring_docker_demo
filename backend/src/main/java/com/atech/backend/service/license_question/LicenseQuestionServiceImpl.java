package com.atech.backend.service.license_question;

import com.atech.backend.dto.LicenseDTO;
import com.atech.backend.dto.LicenseQuestionDTO;
import com.atech.backend.dto.QuestionDTO;
import com.atech.backend.dto.SolutionDTO;
import com.atech.backend.mail.MailDto;
import com.atech.backend.mail.MailService;
import com.atech.backend.repository.license.License;
import com.atech.backend.repository.license.LicenseDAO;
import com.atech.backend.repository.license.MyLicense;
import com.atech.backend.repository.license_question.LicenseQuestion;
import com.atech.backend.repository.license_question.LicenseQuestionDAO;
import com.atech.backend.repository.question.Question;
import com.atech.backend.repository.question.QuestionDAO;
import com.atech.backend.repository.solution.SolutionDAO;
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
public class LicenseQuestionServiceImpl implements LicenseQuestionService {

    final private LicenseQuestionDAO licenseQuestionDAO;
    final private SolutionDAO solutionDAO;
    final private MailService mailService;

    @Override
    public void insert(LicenseQuestionDTO.LicenseQuestionReq licenseQuestionReq) {
        licenseQuestionDAO.insert(licenseQuestionReq.toEntity(), licenseQuestionReq.getType());
    }

    @Override
    public List<LicenseQuestionDTO.LicenseQuestionRes> findAll(String status) {
        List<LicenseQuestion> licenseQuestionList = licenseQuestionDAO.findAll(status);
        List<LicenseQuestionDTO.LicenseQuestionRes> licenseQuestionResList = licenseQuestionList.stream()
                .map(licenseQuestion -> {
                    LicenseQuestionDTO.LicenseQuestionRes licenseQuestionRes = licenseQuestion.toLicenseQuestionRes();
                    List<License> licenseList = solutionDAO.findAllLicense(licenseQuestion.getSolution().getSolutionId());
                    licenseQuestionRes.setLicense(licenseList);

                    return licenseQuestionRes;
                })
                .collect(Collectors.toList());

        return licenseQuestionResList;
    }

    @Override
    public Integer deleteQuestion(Long licenseQuestionId) {
        return licenseQuestionDAO.deleteQuestion(licenseQuestionId);
    }

    @Override
    public void sendMail(MailDto mailDto) throws MessagingException, IOException {
        //메일 전송
        String mailHTML = mailService.createMailHTML(mailDto);
        mailDto.setMessage(mailHTML);
        mailService.sendMail(mailDto);

        //문의글 상태 변경
        Integer resultCnt2 = licenseQuestionDAO.changeStatus(Question.STATUS_SUCCESS, mailDto.getQuestionId());
    }

}
