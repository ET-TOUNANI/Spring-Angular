package com.ettounani.backend_digitalbanking.repositories;

import com.ettounani.backend_digitalbanking.entities.AccountOpperation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountOperationRepository extends JpaRepository<AccountOpperation,Long> {
  List<AccountOpperation> findByBankAccountId(String accountId);
  Page<AccountOpperation> findByBankAccountIdOrderByOperationDateDesc(String accountId, Pageable pageable);
}
