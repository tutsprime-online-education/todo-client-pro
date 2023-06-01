<template>
    <component :is="tag" class="dropdown">
        <slot name="toggler" :toggleClass="toggleClass" :toggle="toggle" />
        <ul class="dropdown-menu" :class="toggleClass" :style="menuStyle">
            <slot name="menu" :toggle="toggle" />
        </ul>
    </component>
</template>

<script setup>
import { ref, computed } from "vue";

defineProps({
    tag: {
        type: String,
        default: 'div'
    }
})

const isOpen = ref(false)

const toggle = () => isOpen.value = !isOpen.value

const toggleClass = computed(() => isOpen.value === true ? 'show' : '')

const menuStyle = computed(() => isOpen.value === true ? 'position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate(0px, 40px);' : '')
</script>