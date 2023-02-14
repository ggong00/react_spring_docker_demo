package com.atech.backend.repository.license;

import java.util.List;

public interface LicenseDAO {

    Integer createLicense(MyLicense myLicense);
    List<MyLicense> findMyLicense(String userId);

}
