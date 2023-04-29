export interface Product{
    id : string;
    name : string;
    price : number;
    description : string;
    promotion : boolean;
}

export interface PageProduct{
    products:Product[];
    page:number;
    size:number;
    totalPages:number;
}