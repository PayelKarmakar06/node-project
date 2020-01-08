export interface User {
    firstName: string,
    middleName: string,
    lastName: string,
    userName: string,
    email: string,
    accountAddress: string,
    password: string,
    role: string,
    nationality: string,
    employmentStatus : string,
    address: {
        houseNumber: string,
        street: string,
        city: string,
        state: string,
        pinCode: string
    },
    kycDetails: {
        aadharNumber: string,   
        pan: string,
        address: string,
        mobileNumber: string 
    }
}