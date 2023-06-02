<template>
    <li>
        <a class="dropdown-item" href="#" v-bind="$attrs">
            <slot />
        </a>
    </li>
</template>

<script>
export default {
    inheritAttrs: false
}
</script>