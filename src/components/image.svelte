<script>
    export let image;
    export let size;
    let src = `./images/${image}${image === 'java' ? '.jpg' : '.png'}`;
</script>

<style>

    img {
        padding: 10px;
    }

</style>

<img {src} alt={image} width={size} height={100}>
