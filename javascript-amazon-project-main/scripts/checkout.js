import {cart, removecart,updatedeliveryoption} from '../data/cart.js'
import {products} from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryoptions} from '../data/deliveryoptions.js';
const today=dayjs();
function renderordersummary(){

    let carthtml='';
    cart.forEach((cartitem)=>{
        const productid= cartitem.productid;

        let matchingproduct;
        products.forEach((productins)=>{
            if(productid==productins.id){
                matchingproduct=productins;
        
            }
            
        })
        
        let deliveryoptionid= cartitem.deliveryoptionid;
        let deliveryoption;

        deliveryoptions.forEach((option)=>{
            if(option.id== deliveryoptionid){
                deliveryoption = option;

            }
        })
        const today=dayjs();
        const date=today.add(deliveryoption.days,'days');
        const datestring=date.format('dddd, MMMM D');

        carthtml+= `
        <div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
        <div class="delivery-date">
            Delivery date: ${datestring}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingproduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingproduct.name}
            </div>
            <div class="product-price">
                $${(matchingproduct.priceCents/100).toFixed(2)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartitem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingproduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryoptionshtml(matchingproduct,cartitem)}
            </div>
        </div>
    </div>`;
    });
    function deliveryoptionshtml(matchingproduct,cartitem){
        let html='';
        deliveryoptions.forEach((option)=>{
        const today=dayjs();
        const date=today.add(option.days,'days');
        const datestring=date.format('dddd, MMMM D');
        
        const pricestring= option.pricecents===0?'FREE':`$${(option.pricecents/100).toFixed(2)} -`;
        const ischecked= option.id==cartitem.deliveryoptionid;
        html+=`
        <div class="delivery-option js-delivery-option"
        data-product-id2="${matchingproduct.id}"
        data-delivery-option-id="${option.id}">
        <input type="radio"
            ${ischecked? 'checked':''}
            class="delivery-option-input"
            name="delivery-option-${matchingproduct.id}">
        <div>
            <div class="delivery-option-date">
                ${datestring}
            </div>
            <div class="delivery-option-price">
            ${pricestring} Shipping
                
            </div>
        </div>
        </div>`
    
        
        
        

        });
        return html;
    }
    document.querySelector('.js-order-summary').innerHTML=carthtml;
    document.querySelectorAll('.js-delete-link').forEach((link)=>{
        link.addEventListener('click',()=>{
            let product_id= link.dataset.productId;
            removecart(product_id);
            const cont = document.querySelector(`.js-cart-item-container-${product_id}`);
            cont.remove();
            })
            
            
        });

    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
        element.addEventListener('click',()=>{
            const productid1=element.dataset.productId2;
            const deliveryoptionid=element.dataset.deliveryOptionId;
            console.log(deliveryoptionid);
            updatedeliveryoption(productid1,deliveryoptionid);
            renderordersummary();
        });
    });
}
;
renderordersummary();