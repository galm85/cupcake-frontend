//redux types

export type LegalData = {
    label:string;
    text:string;
    image?:string;
}

export type Action= {
    type:string;
    payload?:any;
}


export type State = {
    categoriesReducer:any;
    usersReducer:any;
    settingReducer:any;
    productsReducer:any;
    ordersReducer:any;
    restaurantsReducer:any;
    jobsReducer:JobReducer;
}


// reducers
export type JobReducer = {
    jobs:Job[];
}




// DB objects types

export type User={
    _id:string;
    firstName:string;
    lastName:string;
    email:string;
    password?:string;
    confirm?:string;
    image?:any;
    isAdmin?:boolean;
    cloudinary_id?:string;
    createdAt?:string;
    updatedAt?:string;
}


export type Category = {
    _id:string;
    title:string;
    position:number;
    image:string;
    cloudinary_id:string;
    createdAt:string;
    updatedAt:string;
}


export type Product = {
    _id:string;
    title:string;
    image:string;
    description:string;
    price:number;
    category:string | number;
    isVegan:boolean;
    isGlutenFree:boolean;
    position:number;
    cloudinary_id:string;
    createdAt:string;
    updatedAt:string;
    category_title:Array<Category>;
}


export type CurrentOrder = Product & {
    amount:number;
}

export type Order = {
    _id:string;
    items:string;
    isActive:boolean;
    status:string;
    totalAmount:number;
    contactPerson:string,
    address:string,
    city:string,
    phone:string,
    paymentMethod:string,
    creditCard:string,
    createdAt:string;
    updatedAt:string;
}



export type Restaurant = {
    _id:string;
    city:string;
    image:string;
    address:string;
    phone:string;
    events:boolean;
    weekdayOpen:string;
    weekdayClose:string;
    friOpen:string;
    friClose:string;
    satOpen:string;
    satClose:string;
    cloudinary_id:string; 
    createdAt:string;
    updatedAt:string;  
}


export type Job = {
    _id:string;
    positionTitle:string;
    location:string;
    description:string;
    requirement:string;
    createdAt:string;
    updatedAt:string;
    
}


export type Application = {
    _id:string;
    firstName:string;
    lastName:string;
    gender:string;
    phone:string;
    email:string;
    cv:string;
    jobId:string;
    cloudinary_id:String;
    createdAt:string;
    updatedAt:string;
}