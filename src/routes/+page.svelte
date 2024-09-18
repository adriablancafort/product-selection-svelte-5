<script>
    import product from "./product.json";
    import Cart from "$lib/cart.svelte";
    import { cart } from "$lib/cart.svelte.js";

    let mouseX = $state(0);
    let mouseY = $state(0);
    let selectedImage = $state(0);

    let selectedVariant = $state(product.variants[0]);

    let quantity = $state(1);

    let productImage;

    function zoomIn() {
        const { left, top, width, height } = productImage.getBoundingClientRect();
        mouseX = ((event.pageX - left) / width) * 100;
        mouseY = ((event.pageY - top) / height) * 100;
    }

    function availableOptions(slug) {
        // For every attribute, return a set with all the distinct options that appear in the variants
        return new Set(product.variants.map(variant => variant.options[slug]))
    }

    function existsVariant(slug, value) {
        return product.variants.some(variant => 
            Object.entries(selectedVariant.options).every(([optionSlug, optionValue]) => 
                optionSlug === slug ? variant.options[optionSlug] === value : variant.options[optionSlug] === optionValue
            )
        );
    }

    function selectVariant(slug, value) {
        selectedVariant = product.variants.find(variant =>
            Object.entries(selectedVariant.options).every(([optionSlug, optionValue]) =>
                optionSlug === slug ? variant.options[optionSlug] === value : variant.options[optionSlug] === optionValue
            )
        // If no variants match the selected options, assign a variant that matches just the selected value
        ) || product.variants.find(variant => variant.options[slug] === value);

        // Update selectedImage based on the new selectedVariant
        selectedImage = selectedVariant.image;
    }

    function addToCart() {
        cart.addToCart(product.id, selectedVariant.attributes, quantity, selectedVariant.price);
        quantity = 1;
    }
</script>

<p>Discount: <span class="text-white bg-red-500 px-2">-{selectedVariant.discount}%</span></p>
<div class="overflow-hidden">
    <img
        src="{product.images[selectedImage]}" 
        alt="{product.title}"
        class="zoom-image"
        bind:this={productImage}
        onmousemove={zoomIn} 
        style="--mouse-x: {mouseX}%; --mouse-y: {mouseY}%;"
    >
</div>

<div class="flex space-x-2 py-2">
    {#each product.thumbnails as thumbnail, index}
        <img 
            src="{thumbnail}"
            alt="{product.title}"
            class="w-16 h-16 cursor-pointer {index === selectedImage ? "ring" : ""}"
            onmouseenter={selectedImage = index}
        >
    {/each}
</div>

<h1 class="text-4xl">{product.title}</h1>
<p>Price: ${selectedVariant.price}</p>
<p class="{selectedVariant.stock ? "text-green-500" : "text-red-500"}">
    {selectedVariant.stock ? "In Stock" : "Out of Stock"}
</p>
<p>{selectedVariant.description}</p>

{#each product.attributes as attribute}
    <p>Select {attribute.title}:</p>
    <div class="flex space-x-2 py-2">
        {#each availableOptions(attribute.slug) as option}
            <button
                class="px-4 {option === selectedVariant.options[attribute.slug] ? "ring" : ""} {existsVariant(attribute.slug, option) ? "" : "text-gray-400"}"
                onclick={selectVariant(attribute.slug, option)}
            >
                {option}
            </button>
        {/each}
    </div>
{/each}

<label for="quantity">Quantity:</label>
<input type="number" min="1" bind:value={quantity}>
<br>

{#if selectedVariant.stock}
    <button
        class="bg-blue-500 text-white px-4 py-2 rounded"
        onclick={addToCart}
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