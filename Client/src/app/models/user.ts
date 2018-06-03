


export interface UserInfo {
    Id: number,
    UserName: string,
    Email: string
}

export interface UserModel {
    Id: number,
    UserName: string,
    Email: string
}
export interface UserLocationModel {
    location: {
        lat: number,
        lng: number
    }
}