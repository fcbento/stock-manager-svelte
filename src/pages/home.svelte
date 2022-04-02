<script>
    import Image from "../components/image.svelte";
    import Login from './login.svelte';
</script>

<style>

    div{
        display: flex;
        justify-content: center;
        margin-top: 200px;
    }
    
</style>

<div class="row d-flex">
    <Image image={'java'} size={160} />
    <Image image={'spring'} size={200} />
    <Image image={'sql'} size={120} />
    <Image image={'svelte'} size={190} />
</div>

<div class="row d-flex">
    <Login/>
</div>