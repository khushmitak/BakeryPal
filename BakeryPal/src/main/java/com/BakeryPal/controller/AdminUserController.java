package com.BakeryPal.controller;

import com.BakeryPal.dao.GetAdminUser;
import com.BakeryPal.model.requests.AdminUserResponse;
import com.BakeryPal.model.database.AdminUser;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("/adminuser")
public class AdminUserController {
    @Autowired
    private GetAdminUser getAdminUser;

    @Autowired
    private ModelMapper mapper;

    @GetMapping("/{username}")
    public AdminUserResponse getAdminUser(@PathVariable String username) {
        final Optional<AdminUser> adminUser = getAdminUser.getAdminUser(username);
        if (adminUser.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Admin user does not exists.");
        }
        return mapper.map(adminUser.get(), AdminUserResponse.class);
    }
}