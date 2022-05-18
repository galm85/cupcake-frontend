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