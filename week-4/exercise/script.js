const products = [
  { name: "Mouse", price: 49.99, inStock: true },
  { name: "Monitor", price: 300, inStock: true },
  { name: "Cable", price: 15, inStock: false },
];

const affordable = products.filter((p) => p.price <= 100 && p.inStock === true);
console.log("Affordable products:", affordable);

document.querySelector("#localList").innerHTML = affordable
  .map((p) => `<li>${p.name} - $${p.price.toFixed(2)}</li>`)
  .join("");

const statusEl = document.querySelector("#status");
const productList = document.querySelector("#productList");

async function loadProducts() {
  statusEl.textContent = "Loading...";

  try {
    const response = await fetch("https://dummyjson.com/productsXYZ");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    const cheap = data.products.filter((p) => p.price <= 100 && p.stock > 0);
    console.log(
      "Fetched:",
      data.products.length,
      "| Affordable:",
      cheap.length,
    );

    productList.innerHTML = cheap
      .map((p) => `<li>${p.title} - $${p.price.toFixed(2)}</li>`)
      .join("");
    statusEl.textContent = `Showing ${cheap.length} of ${data.products.length} products`;
  } catch (error) {
    console.error("Fetch failed:", error);
    productList.innerHTML = "";
    statusEl.textContent = "Could not load products. Please try again.";
  }
}

loadProducts();

const orderForm = document.querySelector("#orderForm");
const message = document.querySelector("#message");

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Processed!");
  message.textContent = "Processed! Page did not reload.";
});
