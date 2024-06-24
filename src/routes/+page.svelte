<script>
    import product from "./product.json";

    let selectedVariant = $state(product.variants[0]);
    let selectedImage = $state(0);
    let mouseX = $state(0);
    let mouseY = $state(0);
    
    function selectVariant(attributeSlug, option) {
        selectedVariant = product.variants.find(variant => variant.options[attributeSlug] === option);
        selectedImage = selectedVariant.image ? selectedVariant.image - 1 : selectedImage;
    }

    function zoomIn(event) {
        const { left, top, width, height } = event.target.getBoundingClientRect();
        mouseX = ((event.pageX - left) / width) * 100;
        mouseY = ((event.pageY - top) / height) * 100;
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
<p
    class="{selectedVariant.stock || product.stock ? "text-green-500" : "text-red-500"}"
>
    {selectedVariant.stock || product.stock ? "In Stock" : "Out of Stock"}
</p>

{#each product.attributes as attribute}
    <p>Select {attribute.title}:</p>
    <div class="flex space-x-2 py-2">
        {#each attribute.options as option}
            <button
                class="px-4 {option === selectedVariant.options[attribute.slug] ? "ring" : ""}"
                onclick={() => selectVariant(attribute.slug, option)}
            >
                {option}
            </button>
        {/each}
    </div>
{/each}

{#if selectedVariant.stock}
    <button class="bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
{:else}
    <button class="bg-gray-500 text-white px-4 py-2 rounded cursor-not-allowed" disabled>Out of Stock</button>
{/if}

<style>
    .zoom-image {
        transform-origin: var(--mouse-x) var(--mouse-y);
    }

    .zoom-image:hover {
        transform: scale(2);
    }
</style>