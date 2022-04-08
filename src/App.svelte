<script>
	import { Router, Link, Route } from "svelte-routing";

	import Home from "./pages/Home.svelte";
	import Menu from "./pages/Menu.svelte";

	export let url = "";
</script>

<Router {url}>
	<Route path="menu/*" component={Menu} />
	<Route path="/" component={Home} />
</Router>