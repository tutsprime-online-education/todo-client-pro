<template>
    <component :is="tag" :class="togglerClass" data-bs-toggle="dropdown">
        <slot />
    </component>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    hideCaret: {
        type: Boolean,
        default: false
    },
    tag: {
        type: String,
        default: 'a'
    }
})

const togglerClass = computed(() => props.hideCaret ? '' : 'dropdown-toggle')
</script>