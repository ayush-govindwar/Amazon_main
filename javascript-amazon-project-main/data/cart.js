export let cart=[{
    productid:'83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
    quantity:1
}];
export function removecart(product_id){
    let newcart=[];
    cart.forEach((value)=>{
        if(value.id !== product_id){
            newcart.push(value);
        }
        
    });
    cart=newcart;
}