package com.example.springapp.config;

import com.example.springapp.account.Account;
import com.example.springapp.account.AccountRepository;
import com.example.springapp.category.Category;
import com.example.springapp.category.CategoryRepository;
import com.example.springapp.user.UserEntity;
import com.example.springapp.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    AccountRepository accountRepository;
    static UserEntity savedUser;
    public void saveUser(){
        UserEntity user = new UserEntity();
        user.setEmail("test@gmail.com");
        user.setPassword(passwordEncoder.encode(("123")));
        user.setFirstName("Test-Account");
        user.setLastName("1");
        savedUser = user;
        userRepository.save(user);
    }
    public void saveCategory(UserEntity user ,String name, String type){
        Category category = new Category();
        category.setUserId(user);
        category.setName(name);
        category.setType(type);
        categoryRepository.save(category);
    }

    public void saveAccount(UserEntity user ,String name, List<String> paymentType){
        Account account = new Account();
        account.setUser(user);
        account.setName(name);
        account.setPaymentTypes(paymentType);
        account.setCurrentBalance(5000);
        accountRepository.save(account);
    }

    @Override
    public void run(String... args) throws Exception {
        if(!userRepository.existsByEmail("test@gmail.com")){
            saveUser();
            if(savedUser != null){
                //Expenses Category
                saveCategory(savedUser,"Đồ ăn","expense");
                saveCategory(savedUser,"Tạp hoá","expense");
                saveCategory(savedUser,"Thuê nhà","expense");
                saveCategory(savedUser,"Tiện ích","expense");
                saveCategory(savedUser,"Trả nợ","expense");

                //Income Category
                saveCategory(savedUser,"Lương","income");
                saveCategory(savedUser,"Đầu tư","income");
                saveCategory(savedUser,"Tự do ","income");
                saveCategory(savedUser,"Hoa hồng","income");
                saveCategory(savedUser,"Lãi định kì","income");

                //Account Create
                saveAccount(savedUser,"Cash", List.of("other"));
            }
        }
    }
}
