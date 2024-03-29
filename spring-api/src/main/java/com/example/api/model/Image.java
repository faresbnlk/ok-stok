package com.example.api.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "image")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Image {
	@Id
	private Long id;
	private String url;

	// @Column(name = "name")
	// private String name;

	// @Column(name = "type")
	// private String type;

	// @Column(name = "image", unique = false, nullable = false, length = 100000)
	// private byte[] image;
}