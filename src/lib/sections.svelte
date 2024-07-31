<script>
    import { onMount, onDestroy } from 'svelte';

    let currentActiveSection = '';

    onMount(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    currentActiveSection = entry.target.id;
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.5 // Adjust based on when you consider a section to be active
        });

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        return () => {
            observer.disconnect();
        };
    });
</script>

<header>
    <ul>
        <li class={currentActiveSection === 'section1' ? 'active' : ''}>Section 1</li>
        <li class={currentActiveSection === 'section2' ? 'active' : ''}>Section 2</li>
        <li class={currentActiveSection === 'section3' ? 'active' : ''}>Section 3</li>
        <!-- Add more sections as needed -->
    </ul>
</header>

<!-- Example sections -->
<section id="section1">Section 1 Content</section>
<section id="section2">Section 2 Content</section>
<section id="section3">Section 3 Content</section>

<style>
    .active {
        color: red; /* Highlight color */
    }
</style>