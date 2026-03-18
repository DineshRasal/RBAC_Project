package com.rbac.mapper;

import com.rbac.dto.UserResponse;
import com.rbac.entity.User;
import org.mapstruct.Mapper; //MapStruct is a library that automatically converts one object to another

@Mapper(componentModel = "spring") //Mapstrut Genrate implementation automatically
public interface UserMapper {
    UserResponse toUserResponse(User user);
}
