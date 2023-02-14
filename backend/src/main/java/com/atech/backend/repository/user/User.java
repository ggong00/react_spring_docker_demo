package com.atech.backend.repository.user;

import com.atech.backend.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {
    private String userId;
    private String userPass;
    private String name;
    private String position;
    private String tel;
    private String email;
    private String belong;
    private Role role;

    public UserDTO.UserRes toUserRes() {
        return UserDTO.UserRes
                .builder()
                .userId(this.userId)
                .name(this.name)
                .position(this.position)
                .tel(this.tel)
                .email(this.email)
                .belong(this.belong)
                .roleId(this.role.getRoleId())
                .roleName(this.role.getRoleName())
                .build();
    }

    public UserDTO.UserInfoRes toUserInfoRes() {
        return UserDTO.UserInfoRes
                .builder()
                .userId(this.userId)
                .name(this.name)
                .position(this.position)
                .tel(this.tel)
                .email(this.email)
                .belong(this.belong)
                .build();
    }

    /**
     * 해당 유저의 권한 목록
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(role.getRoleName()));

        return authorities;
    }

    /**
     * 비밀번호
     */
    @Override
    public String getPassword() {
        return this.userPass;
    }

    /**
     * PK값
     */
    @Override
    public String getUsername() {
        return this.userId;
    }

    /**
     * 계정 만료 여부
     * true : 만료 안됨
     * false : 만료
     * @return
     */
    @Override
    public boolean isAccountNonExpired() {
        return false;
    }


    /**
     * 계정 잠김 여부
     * true : 잠기지 않음
     * false : 잠김
     * @return
     */
    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    /**
     * 비밀번호 만료 여부
     * true : 만료 안됨
     * false : 만료
     * @return
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    /**
     * 사용자 활성화 여부
     * ture : 활성화
     * false : 비활성화
     * @return
     */
    @Override
    public boolean isEnabled() {
        return false;
    }
}
