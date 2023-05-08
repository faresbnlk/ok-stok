package com.example.api.model;
import com.example.api.util.DateFormatter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Entity
@Data@NoArgsConstructor@AllArgsConstructor
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    @OneToOne
    private Address address;

    private String lastName;

    @Email
    // @Column(nullable = false)
    private String email;

    private String imageUrl;

    private String phone;

    @Column(nullable = false, name = "registred_on")
    private String dateCreated = DateFormatter.formatDate(new Date());

    @ManyToMany
	@JoinTable(name = "USERS_ROLES",
			joinColumns = {@JoinColumn(name = "USER_ID")},
			inverseJoinColumns = {@JoinColumn(name = "ROLE_ID")}
	)
	private Set<Role> roles = new HashSet<>();

    @Column(nullable = false)
    private Boolean verifiedUser = false;

    @JsonIgnore
    private String password;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    private String providerId;

    @NotNull
    @Enumerated(EnumType.STRING)
    private PrimaryContact primaryContact;

    private String description;

    @OneToMany
    private List<Review> reviews;

    @OneToMany
    private List<Product> selledProducts;

    @OneToMany
    private List<Product> products;

    @OneToMany
    private List<Product> purchasedProducts;
    

}
