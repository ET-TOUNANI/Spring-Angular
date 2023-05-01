package com.ettounani.backend_digitalbanking.dtos;

import com.ettounani.backend_digitalbanking.entities.enums.OperationType;
import lombok.Data;
import java.util.Date;

@Data
public class AccountOperationDTO {
    private Long id;
    private Date operationDate;
    private double amount;
    private OperationType type;
    private String description;
}

