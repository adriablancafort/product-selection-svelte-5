<script>
    import product from './product.json';

    let selectedVariant = $state(product.variants[0]);
</script>
    
<p>Discount: <span class="text-white bg-red-500 px-2">-{selectedVariant.discount || product.discount}%</span></p>
<img src="{selectedVariant.image || product.image}" alt="{selectedVariant.title || product.title}">
<h1 class="text-4xl">{selectedVariant.title || product.title}</h1>
<p>Price: ${selectedVariant.price || product.price}</p>
<p>Stock: {selectedVariant.stock || product.stock}</p>

{#each product.attributes as attribute}
    <p>Select {attribute.title}:</p>
    <div class="flex space-x-2 py-2">
        {#each attribute.options as option}
            <button
                class="px-4 {option === selectedVariant.options[attribute.slug] ? "ring" : ""}"
                onclick={() => {selectedVariant = product.variants.find(variant => variant.options[attribute.slug] === option)}}
            >
                {option}
            </button>
        {/each}
    </div>
{/each}