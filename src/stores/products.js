import { writable } from "svelte/store";

export const products = writable([]);

const fetchProducts = async (size = 10, page = 0) => {
    const url = `http://localhost:8080/api/products?size=${size}&page=${page}`
    const res = await fetch(url);
    const data = await res.json();
    products.set(data);
}

fetchProducts();

export { fetchProducts };