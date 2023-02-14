package com.atech.backend.mail;

import com.atech.backend.dto.LicenseDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StreamUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;
import java.io.IOException;
import java.util.Random;

@Component
@Slf4j
public class MailService {

    final private JavaMailSender javaMailSender;
    private static final String FROM_ADDRESS = "dev@atech1221.com";
    private String authCode;

    public MailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
        createKey();
    }

    public void sendMail(MailDto mailDto) throws MessagingException, IOException {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
        mimeMessageHelper.setSubject(mailDto.getMailTitle());
        mimeMessageHelper.setText(mailDto.getMessage(), true);
        mimeMessageHelper.setTo(mailDto.getEmail());
        mimeMessageHelper.setFrom(FROM_ADDRESS);

        if (!CollectionUtils.isEmpty(mailDto.getAttachFileList())) {
            for (MultipartFile file : mailDto.getAttachFileList()) {
                String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                mimeMessageHelper.addAttachment(
                        MimeUtility.encodeText(fileName, "UTF-8", "B"),
                        new ByteArrayResource(StreamUtils.copyToByteArray(file.getInputStream()))
                );
            }
        }

        javaMailSender.send(mimeMessage);
    }

    public String createLicenseHTML(LicenseDTO.MyLicenseReq licenseReq) {
        StringBuffer html = new StringBuffer();
        html.append("   <div style=\"width: 100%; padding: 8px; font-size: 12px;\"> ");
        html.append("       <div style=\"word-break: break-all;\">" + licenseReq.getMessage() + "</div> ");
        html.append("       <div style=\"margin: 12px auto; font-size: 12px; font-weight: bold;\"> ");
        html.append("           <div>솔루션 계정 : <span>" + licenseReq.getSiteId() + "</span></div> ");
        html.append("           <div>솔루션 URL : <span>" + licenseReq.getSitePass() + "</span></div> ");
        html.append("           <div>솔루션 비밀번호 : <a  href=\"" + licenseReq.getSiteUrl() + "\" target=\"_blank\"> 바로가기 </a></div> ");
        html.append("       </div> ");
        html.append("   </div> ");

        return html.toString();
    }

    public String createMailHTML(MailDto mailDto) {
        StringBuffer html = new StringBuffer();
        html.append("   <div style=\"width: 100%; padding: 8px; font-size: 12px;\"> ");
        html.append("       <div style=\"word-break: break-all;\">" + mailDto.getMessage() + "</div> ");
        html.append("   </div> ");

        return html.toString();
    }

    public String createMailAuthHTML() {
        StringBuffer html = new StringBuffer();

        html.append("<div align='center' style='border:1px solid black; font-family:verdana';>");
        html.append("<h3 style='color:blue;'>회원가입 인증 코드입니다.</h3>");
        html.append("<div style='font-size:130%'>");
        html.append("CODE : <strong>");
        html.append(authCode + "</strong><div><br/> ");

        return html.toString();
    }

    public void createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    //  A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }

        this.authCode = key.toString();
    }

    public boolean check(String code) {
        log.info("인증코드 {}", authCode);
        log.info("입력받은 코드 {}",code);
        if(code.equals(authCode)) {
            createKey();

            return true;
        }

        return false;
    }

}

