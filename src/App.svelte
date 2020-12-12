<script>
	import { Router, Link, Route } from "svelte-routing";

	import Home from "./routes/Home.svelte";
	import Menu from './routes/Menu.svelte'

	export let url = "";

</script>

<style>
	span {
		cursor: pointer;
		color: #509ae0;
		border-bottom: 2px solid #509ae0;
	}

</style>

<Router {url}>
	<main class="container-fluid">
		<div>
			<Route path="menu/*" component={Menu} />
			<Route path="/" component={Home} />
		</div>
	</main>
</Router>
