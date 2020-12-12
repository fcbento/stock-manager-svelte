<script>
    import Image from "../components/image.svelte";
    import NavLink from "../components/nav-link.svelte";
</script>

<style>

    div{
        display: flex;
        justify-content: center;
        margin-top: 200px;
    }
    
</style>

<p >Created in order to practice my skills</p>
 
<div class="row d-flex">
    <Image image={'java'} size={160} />
    <Image image={'spring'} size={200} />
    <Image image={'sql'} size={120} />
    <Image image={'svelte'} size={190} />
</div>

<div class="row d-flex">
    <NavLink to="menu">Start</NavLink>
</div>


