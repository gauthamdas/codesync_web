package com.example.colabed.api.model;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Userrepository extends MongoRepository<User,Integer> {

}
