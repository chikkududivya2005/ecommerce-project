// NEW IMAGES - Working & Clear
const products = [
  { 
    id:1, 
    name:"Handmade Cotton Tote Bag", 
    category:"Handmade", 
    color:"Brown", 
    price:350, 
    rating:4.5, 
    stock:"In Stock", 
    image:"https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600", 
    desc:"Eco-friendly handmade cotton tote bag made by local women artisans. Perfect for daily shopping." 
  },
  { 
    id:2, 
    name:"Pure Khadi Kurta", 
    category:"Fashion", 
    color:"White", 
    price:800, 
    rating:4.8, 
    stock:"In Stock", 
    image:"https://images.pexels.com/photos/4066290/pexels-photo-4066290.jpeg?auto=compress&cs=tinysrgb&w=600", 
    desc:"Authentic pure khadi kurta from small-scale weavers of Telangana. Breathable & comfortable." 
  },
  { 
    id:3, 
    name:"Terracotta Clay Vase", 
    category:"Home", 
    color:"Red", 
    price:450, 
    rating:4.3, 
    stock:"5 Left", 
    image:"https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=600", 
    desc:"Beautiful handcrafted terracotta vase for your home decor. Made by village potters." 
  },
  { 
    id:4, 
    name:"Bamboo Table Lamp", 
    category:"Home", 
    color:"Beige", 
    price:1200, 
    rating:4.7, 
    stock:"In Stock", 
    image:"https://images.pexels.com/photos/112811/pexels-photo-112811.jpeg?auto=compress&cs=tinysrgb&w=600", 
    desc:"Sustainable bamboo table lamp. Warm light, eco-friendly material, supports tribal artisans." 
  },
  { 
    id:5, 
    name:"Jaipur Block Print Saree", 
    category:"Fashion", 
    color:"Blue", 
    price:1500, 
    rating:5.0, 
    stock:"In Stock", 
    image:"https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600", 
    desc:"Traditional Jaipur block print cotton saree. Natural dyes, non-branded but premium quality." 
  },
  { 
    id:6, 
    name:"Natural Jute Slippers", 
    category:"Fashion", 
    color:"Green", 
    price:299, 
    rating:4.2, 
    stock:"In Stock", 
    image:"https://images.pexels.com/photos/267202/pexels-photo-267202.jpeg?auto=compress&cs=tinysrgb&w=600", 
    desc:"Comfortable and eco-friendly jute slippers for home use. Handmade." 
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// GET /products
function displayProducts(list = products) {
  const container = document.getElementById("productList");
  container.innerHTML = "";
  list.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/300?text=No+Image'">
        <h4>${p.name}</h4>
        <p>${p.category} | ${p.color} | ⭐${p.rating}</p>
        <p class="price">₹${p.price}</p>
        <p style="color:green; font-size:12px;">${p.stock}</p>
        <button onclick="viewDetails(${p.id})">View Details</button>
        <button onclick="addToCart(${p.id})" style="background:#e67e22;">Add to Cart</button>
      </div>`;
  });
}

function filterProducts() {
  const search = document.getElementById("searchBox").value.toLowerCase();
  const price = document.getElementById("priceFilter").value;
  const cat = document.getElementById("categoryFilter").value;
  let filtered = products.filter(p => p.name.toLowerCase().includes(search));
  if(cat != "all") filtered = filtered.filter(p => p.category == cat);
  if(price != "all") {
    const [min,max] = price.split("-").map(Number);
    filtered = filtered.filter(p => p.price >= min && (max ? p.price <= max : true));
  }
  displayProducts(filtered);
}

function viewDetails(id) {
  const p = products.find(x => x.id == id);
  document.getElementById("modalDetails").innerHTML = `
    <img src="${p.image}" style="width:100%; height:250px; object-fit:cover; border-radius:10px;">
    <h2 style="margin:10px 0;">${p.name}</h2>
    <p><b>Category:</b> ${p.category} | <b>Color:</b> ${p.color}</p>
    <p><b>Price:</b> ₹${p.price}</p>
    <p><b>Rating:</b> ⭐${p.rating} | <b>Availability:</b> ${p.stock}</p>
    <p style="margin-top:10px;">${p.desc}</p>
    <button class="buy-btn" onclick="addToCart(${p.id}); closeModal();">Add to Cart - POST /cart</button>
  `;
  document.getElementById("productModal").style.display = "flex";
}
function closeModal() {document.getElementById("productModal").style.display = "none";}

function addToCart(id) {
  const p = products.find(x => x.id == id);
  cart.push(p);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(p.name + " added to cart! POST /cart Success");
}
function showCart() {
  const c = document.getElementById("cartItems");
  c.innerHTML = "";
  let total = 0;
  if(cart.length === 0) { c.innerHTML = "<p>Cart is empty</p>"; }
  cart.forEach((p,index) => {
    total += p.price;
    c.innerHTML += `<div style="display:flex; justify-content:space-between; padding:8px; border-bottom:1px solid #eee;">
      <span>${p.name} - ₹${p.price}</span>
      <button onclick="removeFromCart(${index})" style="background:red; color:white; border:none; padding:3px 8px; border-radius:4px;">Remove</button>
    </div>`;
  });
  document.getElementById("totalPrice").innerText = total;
  document.getElementById("cartModal").style.display = "flex";
}
function removeFromCart(i) {
  cart.splice(i,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart(); updateCartCount();
}
function updateCartCount() {document.getElementById("cartCount").innerText = cart.length;}
function closeCart() {document.getElementById("cartModal").style.display = "none";}

function showLogin() {document.getElementById("loginModal").style.display = "flex";}
function closeLogin() {document.getElementById("loginModal").style.display = "none";}
function login() {
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  if(u && p) {
    document.getElementById("loginMsg").innerText = "Login Success! Welcome " + u;
    localStorage.setItem("user", u);
    setTimeout(closeLogin, 1000);
  } else {
    document.getElementById("loginMsg").innerText = "Enter username/password";
  }
}

function showCheckout() {closeCart(); document.getElementById("checkoutModal").style.display = "flex";}
function closeCheckout() {document.getElementById("checkoutModal").style.display = "none";}
function placeOrder() {
  const name = document.getElementById("cardName").value;
  const num = document.getElementById("cardNumber").value;
  const exp = document.getElementById("expiry").value;
  const cvv = document.getElementById("cvv").value;
  if(name && num.length == 16 && exp && cvv.length == 3) {
    document.getElementById("orderMsg").innerText = "✅ Order Placed! POST /checkout Success - Thank you for supporting small business!";
    cart = []; localStorage.removeItem("cart"); updateCartCount();
    setTimeout(closeCheckout, 2000);
  } else {
    document.getElementById("orderMsg").innerText = "❌ Please enter valid card details (Name, 16 digit number, MM/YY, 3 digit CVV)";
  }
}

displayProducts(); updateCartCount();