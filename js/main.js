let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

// Function to open the cart
function openCart() {
    cart.classList.add('active');
}

// Add click event listener to the cart icon to open the cart
cartIcon.onclick = () => {
    openCart();
};

// Add click event listener to the close cart button to close the cart
closeCart.onclick = () => {
    cart.classList.remove('active');
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// Function to set up initial event listeners and handlers
function ready() {
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    var addCartButtons = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCartButtons.length; i++) {
        var button = addCartButtons[i];
        button.addEventListener('click', addCartClicked);
    }
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}

// Function to handle buy button click
function buyButtonClicked() {
    alert('Your Order has been placed successfully!');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    // Remove all items from the cart
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    // Update the total price
    updateTotal();
}

// Function to remove items from the cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    // Remove the closest cart item (cart-box)
    buttonClicked.closest('.cart-box').remove();
    // Update the total price
    updateTotal();
}

// Function to handle quantity changes in the cart
function quantityChanged(event) {
    var input = event.target;
    // Ensure the quantity is a valid number greater than 0
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    // Update the total price
    updateTotal();
}

// Function to handle "Add to Cart" button clicks
function addCartClicked(event) {
    var button = event.target;
    var shopItem = button.closest('.product-box');
    var title = shopItem.querySelector('.product-title').innerText;
    var price = shopItem.querySelector('.price').innerText;
    var imageSrc = shopItem.querySelector('.product-img').src;
    // Add item to the cart
    addItemToCart(title, price, imageSrc);
    // Open the cart
    openCart();
    // Update the total price
    updateTotal();
}

// Function to add an item to the cart
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-product-title');

    // Check if the item is already in the cart
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText.trim() === title.trim()) {
            alert('This item is already added to the cart');
            return;
        }
    }

    // HTML structure for the cart item
    var cartRowContents = `
        <img src="${imageSrc}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="bx bxs-trash-alt cart-remove"></i>
    `;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.querySelector('.cart-remove').addEventListener('click', removeCartItem);
    cartRow.querySelector('.cart-quantity').addEventListener('change', quantityChanged);
}

// Function to update the total price in the cart
function updateTotal() {
    var cartContent = document.querySelector('.cart-content');
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
    var total = 0;
    // Calculate the total price based on quantity and price of each item
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.querySelector('.cart-price');
        var quantityElement = cartBox.querySelector('.cart-quantity');
        var price = parseFloat(priceElement.innerText.replace('€', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.querySelector('.total-price').innerText = total + '€';
}

var modal = document.getElementById("loginModal");
var btn = document.getElementById("loginBtn");
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

