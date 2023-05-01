package com.ettounani.backend_digitalbanking.repositories;


import com.ettounani.backend_digitalbanking.entities.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankAccountRepository extends JpaRepository<BankAccount,String> {
}
