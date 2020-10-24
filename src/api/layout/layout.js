import { request } from "../../common/request/request.js"

export function getMenus(data) {
  return request({
    url: '/menus',
    data: data,
  })
}
