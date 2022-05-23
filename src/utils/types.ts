//redux types

export type Action= {
    type:string;
    payload?:any;
}


export type State = {
    categoriesReducer:any,
    usersReducer:any,
    settingReducer:any,
    productsReducer:any,
}





// DB objects types

export type User={
    id?:string;
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