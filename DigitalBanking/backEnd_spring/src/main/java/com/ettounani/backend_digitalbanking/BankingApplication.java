package com.ettounani.backend_digitalbanking;

import com.ettounani.backend_digitalbanking.entities.AccountOpperation;
import com.ettounani.backend_digitalbanking.entities.CurrentAccount;
import com.ettounani.backend_digitalbanking.entities.Customer;
import com.ettounani.backend_digitalbanking.entities.SavingAccount;
import com.ettounani.backend_digitalbanking.entities.enums.AccountStatus;
import com.ettounani.backend_digitalbanking.entities.enums.OperationType;
import com.ettounani.backend_digitalbanking.repositories.BankAccountRepository;
import com.ettounani.backend_digitalbanking.repositories.CustomerRepository;
import com.ettounani.backend_digitalbanking.repositories.AccountOperationRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Date;
import java.util.UUID;
import java.util.stream.Stream;

@SpringBootApplication
public class BankingApplication {

    public static void main(String[] args) {
        SpringApplication.run(BankingApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(CustomerRepository customerRepositorie, BankAccountRepository bankAccountRepositorie, AccountOperationRepository operationRepositorie) {
        return args -> {
            Stream.of("Ahmed", "Abderrahmane", "youssef", "Khadija", "Oumaima").forEach(a -> {
                Customer c = new Customer();
                c.setName(a);

                c.setEmail(a + "@gmail.com");
                customerRepositorie.save(c);

            });
            customerRepositorie.findAll().forEach(
                    c -> {
                        CurrentAccount currentAccount = new CurrentAccount();
                        currentAccount.setBalance(Math.random() * 5989.52);
                        currentAccount.setId(UUID.randomUUID().toString());
                        currentAccount.setOverDraft(554.63);
                        currentAccount.setCurrency("MAD");
                        currentAccount.setCreatedAt(new Date());
                        currentAccount.setCustomer(c);
                        currentAccount.setStatus(AccountStatus.CREATED);
                        bankAccountRepositorie.save(currentAccount);
                        SavingAccount savingAccount = new SavingAccount();
                        savingAccount.setBalance(Math.random() * 58784.52);
                        savingAccount.setId(UUID.randomUUID().toString());
                        savingAccount.setInterestRate(54.63);
                        savingAccount.setCurrency("MAD");
                        savingAccount.setCreatedAt(new Date());
                        savingAccount.setCustomer(c);
                        savingAccount.setStatus(AccountStatus.CREATED);
                        bankAccountRepositorie.save(savingAccount);
                    }
            );

            bankAccountRepositorie.findAll().forEach(bankAccount -> {
                AccountOpperation op = new AccountOpperation();
                op.setAmount(Math.random() * 200.54);
                op.setType(OperationType.CREDIT);
                op.setOperationDate(new Date());
                op.setBankAccount(bankAccount);
                operationRepositorie.save(op);
            });

        };
    }
}
