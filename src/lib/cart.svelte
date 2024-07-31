<script>
    import { cart } from "$lib/cart.svelte.js";    
</script>

{#snippet cartItem(item)}
    <li class="border rounded px-4 py-2">
        <p>Id: {item.id}, Options: {JSON.stringify(item.options)}, Quantity: {item.quantity}</p>
        <button
            onclick={() => cart.deleteFromCart(item.id, item.options)}
            class="bg-red-500 text-white px-4 py-2 rounded"
        >
            Remove
        </button>
    </li>
{/snippet}

<div class="absolute top-0 right-0 {cart.open ? "" : "hidden"}">
    <h2>Cart</h2>
    <ul>
        {#each cart.items as item}
            {@render cartItem(item)}
        {/each}
    </ul>
    <p>Items: {cart.numItems}</p>
    <p>Total: {cart.total}</p>
</div>

<dialog>
    <h2>Delete?</h2>
    <button></button>
    <button></button>
</dialog>