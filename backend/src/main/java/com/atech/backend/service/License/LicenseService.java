package com.atech.backend.service.License;

import com.atech.backend.dto.LicenseDTO;
import com.atech.backend.repository.license.MyLicense;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.List;

public interface LicenseService {

    boolean createLicense(LicenseDTO.MyLicenseReq myLicenseReq) throws MessagingException, IOException;

    List<LicenseDTO.MyLicenseRes> findMyLicense();

}
