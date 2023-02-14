package com.atech.backend.controller;

import com.atech.backend.dto.LicenseDTO;
import com.atech.backend.response.ResponseCode;
import com.atech.backend.response.ResponseMsg;
import com.atech.backend.service.License.LicenseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(produces = "application/json")
@RequiredArgsConstructor
public class MyLicenseController {

    private final LicenseService licenseService;

    @PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
    @GetMapping("/api/my-license")
    public ResponseEntity findAll() {

        List<LicenseDTO.MyLicenseRes> myLicenseResList = licenseService.findMyLicense();

        return new ResponseEntity(
                ResponseMsg.create(ResponseCode.SUCCESS, myLicenseResList),
                HttpStatus.OK
        );
    }
}
