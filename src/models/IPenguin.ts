export interface IPenguin {
    id:number;
    name: string;
    email: string;
    company:Company;
    address:Address;


}
export interface Address {
    street: string
    city: string

}
export interface Company {
    name: string
    catchPhrase: string
    bs: string
}