<script>
    import { Router, Route } from "svelte-routing";
    import User from "./user.svelte";
    import Category from "./category.svelte";
    import Product from "./product.svelte";
    import { onMount } from "svelte";
    import { getUserInfo } from "../utils/user-info";
    import Tab, { Label } from "@smui/tab";
    import TabBar from "@smui/tab-bar";
    import Landing from "../pages/landing.svelte";

    let canSee = false;

    onMount(async () => {
        const isAdmin = getUserInfo().authorities.filter(
            (item) => item.authority === "ROLE_ADMIN"
        );

        if (isAdmin.length > 0) canSee = true;
    });

    const logout = () => {
        localStorage.removeItem("token");
        window.location.assign("http://localhost:5000");
    };

    let active = "Home";
</script>

<Router>
    <button on:click={logout}>Logout</button>
    
    <TabBar tabs={["Home", "Users", "Products", "Categories"]} let:tab bind:active>
        <Tab {tab}>
            <Label>{tab}</Label>
        </Tab>
    </TabBar>

    <div class="status">
        {#if active === "Home"}
             <Landing/>
        {/if}

        {#if active === "Users" && canSee}
            <User/>
        {/if}

        {#if active === "Products"}
            <Product/>
        {/if}

        {#if active === "Categories"}
            <Category/>
        {/if}

    </div>
</Router>