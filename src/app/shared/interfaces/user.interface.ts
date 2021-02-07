
export interface IUser {
    id: number,
    img: string,
    firstName: string,
    lastName: string,
    userName: string,
    phone: string,
    email: string,
    password: string,
    address: Array<IAddress>
}


export interface IAddress {
    addressType: string,
    address: string,
    city: string,
    country: string,
    postalCode: string,
}