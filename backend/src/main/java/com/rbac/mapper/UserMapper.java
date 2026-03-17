package com.rbac.mapper;

import com.rbac.dto.UserResponse;
import com.rbac.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toUserResponse(User user);
}
