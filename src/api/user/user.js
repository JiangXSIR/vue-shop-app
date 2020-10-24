import { request } from "../../common/request/request.js"

export function getUserList(data) {
  return request({
    method: "get",
    url: '/users',
    params: data.params,
  })
}

export function userStateChange(userinfo) {
  return request({
    method: "put",
    url: `/users/${userinfo.id}/state/${userinfo.mg_state}`,
  })
}

export function addUser(userForm) {
  return request({
    method: "post",
    url: '/users',
    data: userForm
  })
}
