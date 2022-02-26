<script>
    import { Router, Link, Route } from "svelte-routing";
    import User from "../routes/user.svelte";
    import Category from "./category.svelte";
    import Product from "../routes/product.svelte";
    import Supplier from "../routes/supplier.svelte";
    import NavLink from "../components/nav-link.svelte";
    import HttpHandler from "../http/http";
    import { onMount } from "svelte";
    import {getUserInfo} from '../utils/user-info';

    let canSee = false;

    onMount(async () => {
        const isAdmin = getUserInfo().authorities.filter(item => item.authority === "ROLE_ADMIN");
        if (isAdmin.length > 0) canSee = true;
    });

    const logout = () => {
        localStorage.removeItem('token');
        window.location.assign('http://localhost:5000');
    }
</script>

<Router>
    <div class="row">
        <div class="col-3">
            <ul>
                {#if canSee}
                    <li>
                        <NavLink to="user">Users</NavLink>
                    </li>
                {/if}

                <li>
                    <NavLink to="category">Categories</NavLink>
                </li>

                <li>
                    <NavLink to="product">Product</NavLink>
                </li>
                <!-- <li>
                    <NavLink to="#">Order</NavLink>
                </li> -->
                <!-- <li>
                    <NavLink to="supplier">Supplier</NavLink>
                </li> -->

                <button on:click={logout}>Logout</button>
            </ul>
        </div>

        <div class="col">
            <div class="components">
                <Route path="user">
                    <User />
                </Route>

                <Route path="category">
                    <Category />
                </Route>

                <Route path="product">
                    <Product />
                </Route>

                <Route path="supplier">
                    <Supplier />
                </Route>
            </div>
        </div>


    </div>
</Router>

<style>
    ul {
        padding: 50px;
        list-style: none;
        background: #3f3f3f;
        height: 100vh;
    }

    li {
        margin: 20px;
        cursor: pointer;
        color: #ffffff;
        border: 1px solid black;
        padding: 15px;
        background-color: white;
        text-align: center;
        border-radius: 10px;
    }

    .components {
        padding: 50px;
    }
</style>
