import { request } from "../../common/request/request.js"

export function login(data) {
  return request({
    method: "post",
    url: '/login',
    data: data,
  })
}
