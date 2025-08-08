const renderProducts = (products) => {
  const productsContainer = document.getElementById('products-container');
  productsContainer.innerHTML = '';

  console.log(products);
  products.forEach((product) => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
    <img src=${product.imgSrc}>
    <p>${product.title}</p>
    <p>${product.availability}</p>
    <p>${product.price}</p>
    `;

    productsContainer.appendChild(card);
  });
};

let allProducts = [];

async function getProducts() {
  const product = document.getElementById('products-container');
  const localApi = './assets/src/products.json';

  try {
    const response = await fetch(localApi);

    if (!response.ok) {
      product.textContent = 'Chyba pří načítání dat' + response.status;
      return;
    }

    allProducts = await response.json();
    renderProducts(allProducts.slice(0, 4));
    console.log(allProducts);
  } catch (error) {
    product.textContent = 'Nepodařilo se načíst produkty.';
  }
}

getProducts();

const filterCategory = (category) => {
  const filtered = allProducts.filter(
    (product) => product.category === category,
  );
  renderProducts(filtered.slice(0, 4));
};

const btnNews = document.getElementById('filterNews');
const btnMostSold = document.getElementById('filterMostSold');
const btnRec = document.getElementById('filterRec');

btnNews.addEventListener('click', () => {
  filterCategory('Novinky');
});
btnMostSold.addEventListener('click', () => {
  filterCategory('Nejprodávanější');
});
btnRec.addEventListener('click', () => {
  filterCategory('Doporučené');
});
