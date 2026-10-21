// 1. Data (exercise ka array)
const products = [
  { name: "Mouse", price: 49.99, inStock: true },
  { name: "Monitor", price: 300, inStock: true },
  { name: "Cable", price: 15, inStock: false },
];

// 2. Challenge part 1: price <= 100 aur inStock === true
const affordable = products.filter((p) => p.price <= 100 && p.inStock === true);
console.log("Affordable products:", affordable);

// 3. Result ko page pe dikhao
const productList = document.querySelector("#productList");
productList.innerHTML = affordable
  .map((p) => `<li>${p.name} - $${p.price.toFixed(2)}</li>`)
  .join("");

// 4. Challenge part 2: submit pe page reload roko
const orderForm = document.querySelector("#orderForm");
const message = document.querySelector("#message");

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Processed!");
  message.textContent = "Processed! Page did not reload.";
});
