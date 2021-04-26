const vec_minus = [];
const vec_plus = [];
const vec_add_carts = [];
const vec_counters = [];
const vec_products = [];
const vec_descrs = [];

const cart_container = document.querySelector('#container_cart');
cart_container.parentElement.classList.add('hidden');
const article = document.querySelector('article');
const search = document.querySelector('#search');
const game_apiKey = 'e45669b248164efc9ebdc1962df2a0e9';

const prod_cont = document.createElement('div');    
document.querySelector('#container').appendChild((prod_cont));  

function onResponse(response){
    if(response.ok){
        console.log('json recuperato');
        return response.json();        
    }
    else
        console.log('errore! impossibile recuperare il json');
        
}

function onJson(json){   
    prod_cont.innerHTML = '';
    const results =  json.results;   
   
    for(product of results){        
        const div_prod = document.createElement('div');
        prod_cont.appendChild(div_prod);
        div_prod.classList.add('product');
        const title = document.createElement('h3');
        title.classList.add('title');
        title.textContent = product.name;
        div_prod.appendChild(title);
        const img = document.createElement('img');  
        img.src = product.background_image; 
        div_prod.appendChild(img);
        const descr = document.createElement('p');
        const descr_button = document.createElement('p');
        descr_button.classList.add('descr_button');
        descr_button.textContent = product_menu.descr;       
        descr_button.addEventListener('click',onClickDescr);
        descr.classList.add('descr');
        descr.classList.add('hidden');        
        const minus = document.createElement('p');
        minus.classList.add('minus_plus');
        minus.addEventListener('click',onClickMinus);
        const plus = document.createElement('p');
        plus.classList.add('minus_plus');
        plus.addEventListener('click',onClickPlus);
        const counter = document.createElement('p'); 
        counter.classList.add('counter');
        const add_cart = document.createElement('p');
        add_cart.classList.add('add_cart');
        add_cart.addEventListener('click',onClickAddCart);        
        descr.textContent = product.genres[0].name;
        minus.textContent = product_menu.minus;
        plus.textContent = product_menu.plus;
        counter.textContent = product_menu.counter;
        add_cart.textContent = product_menu.addToCart;    
        
        div_prod.appendChild(descr_button);
        div_prod.appendChild(descr);
        div_prod.appendChild(minus);
        div_prod.appendChild(counter);
        div_prod.appendChild(plus);
        div_prod.appendChild(add_cart);

        vec_counters.push(counter);
        vec_minus.push(minus);
        vec_plus.push(plus);
        vec_add_carts.push(add_cart);
        vec_products.push(div_prod);
        vec_descrs.push(descr_button);
    }   

}

function API_search(){
    let val = '';
    if(search.value !== '')
        val = search.value;    
    return val;
}

function gameAPI(){   
    let val = API_search();
    const url = "https://api.rawg.io/api/games?key="+game_apiKey+"&search="+encodeURIComponent(val)+"&page_size=5";
    fetch(url).then(onResponse).then(onJson);   
}

function find(event){
    event.preventDefault();    
    gameAPI();
}

const form = document.querySelector("form");
form.addEventListener('submit',find);
gameAPI();


function onClickPlus(event){
    const plus = event.currentTarget;
    const div  = plus.parentElement;
    const counter = div.querySelector('.counter');
    let numb = parseInt(counter.textContent) + 1;
    counter.textContent = numb;   
}


function onClickMinus(event){
    const minus = event.currentTarget;
    const div  = minus.parentElement;
    const counter = div.querySelector('.counter');
    if(parseInt(counter.textContent) === 0)
        return
    let numb = parseInt(counter.textContent) - 1;
    counter.textContent = numb;
}
var var_prodSearched = [];

function onClickDelete(event){
    const title = event.currentTarget.parentElement.querySelector('.title');     
    for(prod of vec_products){        
        if(prod.querySelector('.title').textContent === title.textContent){
            prod.querySelector('.add_cart').addEventListener('click',onClickAddCart);
            event.currentTarget.parentElement.remove();     
            
        }
    }

}



function onClickAddCart(event){
    const num_count = parseInt(event.currentTarget.parentElement.querySelector('.counter').textContent);
    if(num_count === 0)          
        return;   

    const prod_img = event.currentTarget.parentElement.querySelector('img');
    const prod_title = event.currentTarget.parentElement.querySelector('.title');
    const counter = parseInt(event.currentTarget.parentElement.querySelector('.counter').textContent);
    const title = document.createElement('h3');
    title.classList.add('title');
    title.textContent = prod_title.textContent;
    const cart = document.querySelector('#cart');
    const cart_elem = document.createElement('div');
    cart_elem.classList.add('cart_element');
    const img = document.createElement('img');   
    img.src = prod_img.src;      
    cart_elem.appendChild(title);
    cart_elem.appendChild(img);
    const del = document.createElement('p');
    const quantity = document.createElement('p');
    quantity.classList.add('.quantity');
    quantity.textContent = "Quantita': " + counter;    
    del.textContent = 'X';
    del.classList.add('delete'); 
    
    cart_elem.appendChild(quantity);    
    cart_elem.appendChild(del);    
    cart.appendChild(cart_elem);  

    del.addEventListener('click',onClickDelete);
    event.currentTarget.removeEventListener('click',onClickAddCart);    
}

for(add_cart of vec_add_carts){
    add_cart.addEventListener('click',onClickAddCart);
}

function onCheckOutClick(){
    const elements = document.querySelectorAll('.cart_element');
    for(el of elements){
        el.remove();        
    }
    
    for(prod of vec_products){
        prod.querySelector('.add_cart').addEventListener('click',onClickAddCart);

    }

}

var show_cart = false;
function onClickShowCart(){
    if(!show_cart){
        cart_container.parentElement.classList.remove('hidden');    
        show_cart = true;
    }
    else{
        cart_container.parentElement.classList.add('hidden');
        show_cart = false;
    }

}


function onClickDescr(event){  
    const parent = event.currentTarget.parentElement;
    parent.querySelector('.descr').classList.remove('hidden');
    parent.querySelector('.descr_button').classList.add('hidden');
}


const check_out = document.querySelector('#check_out');
check_out.addEventListener('click',onCheckOutClick);

const cart_button = document.querySelector('#cart_button');
cart_button.addEventListener('click',onClickShowCart);

for(descr of vec_descrs){
    descr.addEventListener('click',onClickDescr);
}










