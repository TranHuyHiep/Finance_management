package com.example.springapp.account;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Arrays;
import java.util.List;

@Getter
@Setter
@Builder
public class AccountResponseDto {
    private int accountId;
    private String name;
    private double currentBalance;
    private String paymentTypes;
    private double totalExpense;
    private double totalIncome;

    public List<String> getPaymentTypes() {
        return Arrays.asList(paymentTypes.split(", "));
    }

    public void setPaymentTypes(List<String> paymentTypes) {
        this.paymentTypes = String.join(", ", paymentTypes);
    }
}