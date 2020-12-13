<script>
    import { Router, Link, Route } from "svelte-routing";
    import User from "../routes/user.svelte";
    import Category from "./category.svelte";
    import Product from "../routes/product.svelte";
    import NavLink from "../components/nav-link.svelte";
</script>

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

<Router>
    <div class="row">
        <div class="col-3">
            <ul>
                <li>
                    <NavLink to="user">Users</NavLink>
                </li>

                <li>
                    <NavLink to="category">Categories</NavLink>
                </li>

                <li>
                    <NavLink to="product">Product</NavLink>
                </li>
                <li>
                    <NavLink to="#">Order</NavLink>
                </li>
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
            </div>
        </div>
    </div>
</Router>
