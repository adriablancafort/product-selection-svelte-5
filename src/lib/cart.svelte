<script>
    import { cart } from "$lib/cart.svelte.js";
</script>

<ul class="absolute top-0 right-0">
    <h2>Cart</h2>
    {#each cart.items as item}
        <li>Id: {item.id}, Options: {JSON.stringify(item.options)}, Quantity: {item.quantity}</li>
        <button
            onclick={() => cart.deleteFromCart(item.id, item.options)}
            class="bg-red-500 text-white px-4 py-2 rounded"
        >
            Remove
        </button>
    {/each}
</ul>