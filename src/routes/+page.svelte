<script>
    import product from "./product.json";
    import Cart from "$lib/cart.svelte";
    import { cart } from "$lib/cart.svelte.js";

    let mouseX = $state(0);
    let mouseY = $state(0);
    let selectedImage = $state(0);
    let selectedVariant = $state(product.variants[0]);
    let quantity = $state(1);

    function zoomIn(event) {
        const { left, top, width, height } = event.target.getBoundingClientRect();
        mouseX = ((event.pageX - left) / width) * 100;
        mouseY = ((event.pageY - top) / height) * 100;
    }

    function availableOptions(slug) {
        // For every option, get all distinct option values that appear in the variants
        return [...new Set(product.variants.map(variant => variant.options[slug]))];
    }

    function existsVariant(slug, value) {
        return product.variants.some(variant => 
            Object.keys(selectedVariant.options).every(key => 
                // Each option value matches the selectedVariant except for the option value of the option "slug", that matches the given value
                key === slug ? variant.options[key] === value : variant.options[key] === selectedVariant.options[key]
            )
        );
    }

    function selectVariant(slug, value) {
        selectedVariant = product.variants.find(variant =>
            Object.keys(selectedVariant.options).every(key =>
                // Each option value matches the selectedVariant except for the option value of the option "slug", that matches the given value
                key === slug ? variant.options[key] === value : variant.options[key] === selectedVariant.options[key]
            )
        // If no variants match the selected options, assign a variant that matches just the selected value
        ) || product.variants.find(variant => variant.options[slug] === value);

        // Update selectedImage based on the new selectedVariant
        selectedImage = selectedVariant.image ? selectedVariant.image - 1 : selectedImage;
    }
</script>

<p>Discount: <span class="text-white bg-red-500 px-2">-{selectedVariant.discount || product.discount}%</span></p>
<div class="overflow-hidden">
    <img
        src="{product.images[selectedImage]}" 
        alt="{selectedVariant.title || product.title}"
        class="zoom-image"
        onmousemove={zoomIn} 
        style="--mouse-x: {mouseX}%; --mouse-y: {mouseY}%;"
    >
</div>

<div class="flex space-x-2 py-2">
    {#each product.thumbnails as thumbnail, index}
        <img 
            src="{thumbnail}"
            alt="{selectedVariant.title || product.title}"
            class="w-16 h-16 cursor-pointer {index === selectedImage ? "ring" : ""}"
            onmouseenter={() => selectedImage = index}
        >
    {/each}
</div>

<h1 class="text-4xl">{selectedVariant.title || product.title}</h1>
<p>Price: ${selectedVariant.price || product.price}</p>
<p class="{selectedVariant.stock || product.stock ? "text-green-500" : "text-red-500"}">
    {selectedVariant.stock || product.stock ? "In Stock" : "Out of Stock"}
</p>
<p>{selectedVariant.description || product.description}</p>

{#each product.attributes as attribute}
    <p>Select {attribute.title}:</p>
    <div class="flex space-x-2 py-2">
        {#each availableOptions(attribute.slug) as option}
            <button
                class="px-4 {option === selectedVariant.options[attribute.slug] ? "ring" : ""} {existsVariant(attribute.slug, option) ? "" : "text-gray-400"}"
                onclick={() => selectVariant(attribute.slug, option)}
            >
                {option}
            </button>
        {/each}
    </div>
{/each}

<label for="quantity">Quantity:</label>
<input type="number" min="1" value="{quantity}" oninput={() => quantity = event.target.value}>
<br>

{#if selectedVariant.stock}
    <button
        class="bg-blue-500 text-white px-4 py-2 rounded"
        onclick={() => cart.addToCart( product.id, selectedVariant.options, quantity )}
    >
        Add to Cart
    </button>
{:else}
    <button class="bg-gray-500 text-white px-4 py-2 rounded cursor-not-allowed" disabled>Out of Stock</button>
{/if}

<Cart />

<style>
    .zoom-image {
        transform-origin: var(--mouse-x) var(--mouse-y);
    }

    .zoom-image:hover {
        transform: scale(2);
    }
</style>