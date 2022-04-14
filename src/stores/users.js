import { writable } from "svelte/store";

export const users = writable([]);

const fetchUsers = async (size = 10, page = 0) => {
    const url = `http://localhost:8080/api/users?size=${size}&page=${page}`
    const res = await fetch(url);
    const data = await res.json();
    users.set(data);
}

fetchUsers();

export { fetchUsers };