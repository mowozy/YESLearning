package com.mowozy.Controller;

import com.mowozy.Entity.Users;
import com.mowozy.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by moonwolfzy on 2017-12-12.
 */

@Controller
@EnableAutoConfiguration
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/login")
    String login(Model model) {
        model.addAttribute("user", new Users());
        return "login";
    }

    @RequestMapping("/register")
    String register(Model model) {
        model.addAttribute("user", new Users());
        return "register";
    }

    @RequestMapping("users-details")String userDetails(Model model){
        return "users-details";
    }

    @RequestMapping(value = "/userLogin", method = RequestMethod.POST)
    String userLogin(Users user, Model model) {

        boolean flag = userService.verifyUser(user);
        if (flag) {
            return "users-details";
        } else {
            return "404";
        }

    }

    @RequestMapping(value = "/userRegister", method = RequestMethod.POST)
    String registerUser(Users user, Model model) {


        boolean flag = userService.registerUser(user);
        if (flag) {
            model.addAttribute("name",user.getName());
            return "registerSuccess";

        }
        else{
            model.addAttribute("email",user.getEmail());
            return "registerFail";
        }

    }
}





