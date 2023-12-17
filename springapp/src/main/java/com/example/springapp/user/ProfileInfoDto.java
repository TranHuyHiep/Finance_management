package com.example.springapp.user;

import lombok.Data;

import java.util.Date;

@Data
public class ProfileInfoDto {
    private String firstName;

    private String lastName;

    private String email;

    private byte[] profileImage;

    private Date birthday;

    private String gender;

    private String phone;

}
