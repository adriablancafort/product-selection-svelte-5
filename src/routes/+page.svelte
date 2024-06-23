<script>
    import product from './product.json';

    let selectedVariant = $state(product.variants[0]);
    let selectedImage = $state(product.variants[0].image || 0);

    function selectVariant(attributeSlug, option) {
        selectedVariant = product.variants.find(variant => variant.options[attributeSlug] === option);
        selectedImage = selectedVariant.image || selectedImage;
    }
</script>

<p>Discount: <span class="text-white bg-red-500 px-2">-{selectedVariant.discount || product.discount}%</span></p>
<img src="{product.images[selectedImage]}" alt="{selectedVariant.title || product.title}">

<div class="flex space-x-2 py-2">
    {#each product.thumbnails as thumbnail, index}
        <img 
            src="{thumbnail}"
            alt="{selectedVariant.title || product.title}"
            class="w-16 h-16 cursor-pointer {index === selectedImage ? 'ring' : ''}"
            onmouseenter={() => selectedImage = index}
        >
    {/each}
</div>

<h1 class="text-4xl">{selectedVariant.title || product.title}</h1>
<p>Price: ${selectedVariant.price || product.price}</p>
<p>{selectedVariant.stock || product.stock ? 'In Stock' : 'Out of Stock'}</p>

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