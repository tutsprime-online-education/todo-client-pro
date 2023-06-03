<template>
    <li>
        [{{ task.created_at }}]
        {{ taskName }}
    </li>
</template>

<script setup>
import { computed } from "vue";
import { stripPriorityFrom } from "../../composables/usePriority";

const props = defineProps({
    task: Object
})

const taskName = computed(() => stripPriorityFrom(props.task.name))
</script>