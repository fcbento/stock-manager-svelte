<script>
    import { Router, Link, Route } from "svelte-routing";
    import User from "../routes/user.svelte";
    import Category from "./category.svelte";
    import Product from "../routes/product.svelte";
</script>

<style>

    ul {
        padding: 50px;
        list-style: none;
        background: #ffffff;
        height: 95vh;
    }

    li {
        margin: 10px;
        cursor: pointer;
        color: rgb(62, 222, 250);
    }

    .components{
        padding: 50px;
    }

</style>

<Router>

    <div class="row">

        <div class="col-3">
            <ul>
                <li>
                    <Link to="user">Users</Link>
                </li>

                <li>
                    <Link to="category">Categories</Link>
                </li>

                <li> 
                     <Link to="product">Product</Link>
                </li>

                <li>Order</li>
            </ul>
        </div>

        <div class="col-4">
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
