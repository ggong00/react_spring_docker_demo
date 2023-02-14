package com.atech.backend.controller;

import com.atech.backend.dto.LicenseDTO;
import com.atech.backend.dto.LicenseQuestionDTO;
import com.atech.backend.dto.QuestionDTO;
import com.atech.backend.dto.UserDTO;
import com.atech.backend.mail.MailDto;
import com.atech.backend.response.ResponseCode;
import com.atech.backend.response.ResponseMsg;
import com.atech.backend.service.License.LicenseService;
import com.atech.backend.service.license_question.LicenseQuestionService;
import com.atech.backend.service.question.QuestionService;
import com.atech.backend.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;

@Slf4j
@RestController
@RequestMapping(produces = "application/json")
@RequiredArgsConstructor
public class AdminController {

    final private UserService userService;
    final private QuestionService questionService;
    final private LicenseQuestionService licenseQuestionService;
    final private LicenseService licenseService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/api/admin/question")
    public ResponseEntity findAllByQuestion(
            @RequestParam("status") String status) {

        // 문의글 전체 조회
        List<QuestionDTO.QuestionRes> questionResList = questionService.findAll(status);

        return new ResponseEntity(
                ResponseMsg.create(ResponseCode.SUCCESS, questionResList),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/api/admin/license_question")
    public ResponseEntity findAllByLicenseQuestion(
            @RequestParam("status") String status) {

        // 문의글 전체 조회
        List<LicenseQuestionDTO.LicenseQuestionRes> licenseQuestionResList = licenseQuestionService.findAll(status);

        return new ResponseEntity(
                ResponseMsg.create(ResponseCode.SUCCESS, licenseQuestionResList),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/api/admin/license-question/{licenseQuestionId}")
    public ResponseEntity deleteLicenseQuestion(@PathVariable("licenseQuestionId") Long licenseQuestionId) {

        Integer resultCnt = licenseQuestionService.deleteQuestion(licenseQuestionId);

        if (resultCnt != 1) {
            return new ResponseEntity(
                    ResponseMsg.create(ResponseCode.FAIL),
                    HttpStatus.OK
            );
        }

        return new ResponseEntity(
                ResponseMsg.create(ResponseCode.SUCCESS, resultCnt),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/api/admin/question/{questionId}")
    public ResponseEntity deleteQuestion(@PathVariable("questionId") Long questionId) {

        Integer resultCnt = questionService.deleteQuestion(questionId);

        if (resultCnt != 1) {
            return new ResponseEntity(
                    ResponseMsg.create(ResponseCode.FAIL),
                    HttpStatus.OK
            );
        }

        return new ResponseEntity(
                ResponseMsg.create(ResponseCode.SUCCESS, resultCnt),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/api/admin/license")
    public ResponseEntity createLicense(@ModelAttribute LicenseDTO.MyLicenseReq myLicenseReq) throws MessagingException, IOException {

        // 유저가 존재하지 않으면 계정을 생성해주라는 메세지 반환
        if (!userService.userDuplChk(myLicenseReq)) {
            return new ResponseEntity(
                    ResponseMsg.create(ResponseCode.USER_MISS),
                    HttpStatus.OK
            );
        }

        // 계정이 존재한다면 라이선스 지급 절차 수행 + 응답 메일 전송
        boolean result = licenseService.createLicense(myLicenseReq);

        // insert 실패시 에러 메세지
        if (!result) {
            return new ResponseEntity(
                    ResponseMsg.create(ResponseCode.FAIL),
                    HttpStatus.OK
            );
        }

        return new ResponseEntity(
                ResponseMsg.create(ResponseCode.SUCCESS),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/api/admin/mail")
    public ResponseEntity sendMail(
            @ModelAttribute MailDto mailDto) throws MessagingException, IOException {

        questionService.sendMail(mailDto);

        return new ResponseEntity(
                ResponseMsg.create(ResponseCode.SUCCESS),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/api/admin/userChk")
    public ResponseEntity userChk(@RequestBody UserDTO.UserReq userReq) throws NoSuchAlgorithmException, InvalidKeySpecException {

        // 유저가 이미 존재하는지 체크
        if (userService.userDuplChk(userReq)) {
            return new ResponseEntity(
                    ResponseMsg.create(ResponseCode.USER_DUPL),
                    HttpStatus.OK
            );
        }

        return new ResponseEntity(
                ResponseMsg.create(ResponseCode.SUCCESS),
                HttpStatus.OK
        );
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/api/admin/create-user")
    public ResponseEntity insert(@RequestBody UserDTO.UserReq userReq) throws NoSuchAlgorithmException, InvalidKeySpecException {

        // 이메일 중복 체크
        if (userService.userDuplChk(userReq)) {
            return new ResponseEntity(
                    ResponseMsg.create(ResponseCode.USER_DUPL),
                    HttpStatus.OK
            );
        }

        // 아이디 중복 체크
        if (userService.idDuplChk(userReq)) {
            return new ResponseEntity(
                    ResponseMsg.create(ResponseCode.ID_DUPL),
                    HttpStatus.OK
            );
        }

        // 계정 생성
        userService.join(userReq);

        return new ResponseEntity(
                ResponseMsg.create(ResponseCode.SUCCESS),
                HttpStatus.OK
        );
    }

}
