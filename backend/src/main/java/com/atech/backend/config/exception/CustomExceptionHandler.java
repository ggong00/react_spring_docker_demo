package com.atech.backend.config.exception;

import com.atech.backend.response.ResponseCode;
import com.atech.backend.response.ResponseMsg;
import com.sun.mail.smtp.SMTPAddressFailedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSendException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.mail.MessagingException;

@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(MailSendException.class)
    protected ResponseEntity MailException(MailSendException e) {
        e.printStackTrace();

        return new ResponseEntity(
                ResponseMsg.create(ResponseCode.MAIL_TO_NOTFOUND, e.getMessage()),
                HttpStatus.OK);
    }

    @ExceptionHandler(Exception.class)
    protected ResponseEntity handleIllegalArgumentException(Exception e) {
        e.printStackTrace();

        return new ResponseEntity(
                ResponseMsg.create(ResponseCode.SERVER_ERROR, e.getMessage()),
                HttpStatus.OK);
    }
}
