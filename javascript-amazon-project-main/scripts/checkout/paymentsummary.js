
import {cart, removecart,updatedeliveryoption} from '../../data/cart.js'
import {products} from '../../data/products.js';
import {deliveryoptions} from '../../data/deliveryoptions.js'
function render(){
    function renderpaymentsummary(){
        //totalpayment
        let matchingproduct;
        let price;
        let totalprice =0;
        cart.forEach((instance)=>{
            
        products.forEach((product)=>{
            
        if(instance.productid==product.id){
            matchingproduct=product;
            price= (Number(matchingproduct.priceCents)*Number(instance.quantity));
            totalprice+=price;
            
            

            
            
        }
        })
            
        })
        
        console.log((totalprice/100).toFixed(2))
        //shippingprice
        let shippingprice=0;
        cart.forEach((element)=>{
            shippingprice+=updatetotalshipping(element.deliveryoptionid)
        })
        
        console.log(((totalprice+shippingprice)/100).toFixed(2));
        updatepaymentcode(totalprice,shippingprice);



        
    }
    function updatepaymentcode(totalprice,shippingprice){
        const totalBeforeTax = totalprice + shippingprice;
        const estimatedTax = (10 / 100) * totalBeforeTax;
        const orderTotal = totalBeforeTax + estimatedTax;

        let html=`
        <div class="payment-summary-title">
        Order Summary
        </div>

        <div class="payment-summary-row">
        <div>Items (${cart.quantity}):</div>
        <div class="payment-summary-money">$${((totalprice)/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${((shippingprice)/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${((totalBeforeTax)/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${((estimatedTax)/100).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${((orderTotal)/100).toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary">
        Place your order
        </button>
        </div>
    </div>`
    document.querySelector('.js-payment-summary').innerHTML=html;

    }
    function updatetotalshipping(deliveryoptionid){
        //shippingprice
        let shippingprice=0;
            if(deliveryoptionid=='1'){
                shippingprice+=0;
            }
            else if(deliveryoptionid=='2'){
                shippingprice+=499;
            }
            else{
                shippingprice+=999;
            }
        return shippingprice;
        
        console.log(((totalprice+shippingprice)/100).toFixed(2));

    }
    renderpaymentsummary();
    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
        element.addEventListener('click',()=>{
            const productid1=element.dataset.productId2;
            const deliveryoptionid=element.dataset.deliveryOptionId;
            updatetotalshipping(deliveryoptionid);
            render();
            
            

            
            
        });
    });

    console.log(cart);
}
render();
