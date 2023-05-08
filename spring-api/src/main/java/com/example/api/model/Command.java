package com.example.api.model;


import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.example.api.util.DateFormatter;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "commands")
@Data@NoArgsConstructor@AllArgsConstructor
public class Command {
    @Id
    private String id = "OS" + DateFormatter.formatDate(new Date()) + UUID.randomUUID().toString().substring(22).toUpperCase();

    @OneToMany
    private List<Product> products;

    @Column(nullable = false, name = "created_on")
    private String dateCreated = DateFormatter.formatDate(new Date());

    @OneToOne
    private User customer;

    private CommandStatus commandStatus;

    private String details;
}
