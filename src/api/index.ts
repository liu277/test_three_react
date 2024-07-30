import request from "@/utils/request";


export const register = (data: any): Promise<any> => {
  return request('/register', {
    method: "POST",
    body: data
  })
}

export const login = (data: any): Promise<any> => {
  return request('/login', {
    method: "POST",
    body: data
  })
}

export const getUserInfo = (): Promise<any> => {
  return request('/getUserInfo')
}
export const getUserList = (): Promise<any> => {
  return request('/userList')
}
export const setUserInfo = (data: any): Promise<any> => {
  return request('/setUserInfo', {method: "POST", body:data})
}

export const getShopList = (data): Promise<any> => {
  return request('/shopList', {method: "POST", body: data})
}

export const addShop = (data: any): Promise<any> => {
  return request('/addShop', {method: "POST", body:data})
}
export const editShop = (data: any): Promise<any> => {
  return request('/editShop', {method: "POST", body:data})
}
