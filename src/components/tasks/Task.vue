<template>
    <li class="list-group-item py-3">
        <div class="d-flex justify-content-start align-items-center">
            <input class="form-check-input mt-0" 
                type="checkbox" 
                :class="[completedClass, priorityClass]" 
                :checked="task.is_completed" 
                @change="markTaskAsCompleted"
            />
            <div class="ms-2 flex-grow-1" 
                :class="completedClass" 
                title="Double click the text to edit or remove"
                @dblclick="isEdit = true"
            >
                <div class="relative" v-if="isEdit">
                    <input class="editable-task" 
                        type="text" 
                        v-focus 
                        @keyup.esc="undo"
                        @keyup.enter="updateTask"
                        v-model="editingTask"
                    />
                </div>
                <span v-else>{{ taskName }}</span>
            </div>
            <!-- <div class="task-date">24 Feb 12:00</div> -->
        </div>
        <TaskActions 
            @edit="isEdit = true" v-show="!isEdit" 
            @remove="removeTask"
        />
    </li>
</template>

<script setup>
import { computed, ref } from "vue";
import { usePriorityStore } from "../../stores/priority";
import TaskActions from "./TaskActions.vue";
const priorityStore = usePriorityStore()
const { getPriority } = priorityStore
import { stripPriorityFrom } from "../../composables/usePriority";

const props = defineProps({
    task: Object
})

const emit = defineEmits(['updated', 'completed', 'removed'])

const isEdit = ref(false)
const editingTask = ref(props.task.name)
const completedClass = computed(() => props.task.is_completed ? "completed" : "")
const priorityClass = computed(() => props.task.priority === null ? "priority-none" : `priority-${props.task.priority.name}`)
const taskName = computed(() => stripPriorityFrom(props.task.name))

const vFocus = {
    mounted: (el) => el.focus()
}

const updateTask = event => {
    const updatedTask = { 
        ...props.task, 
        name: event.target.value,
        priority_id: props.task.priority === null ? null : props.task.priority.id
    }

    const priority = getPriority(event.target.value)
    if (priority) {
        updatedTask.priority_id = priority.id;
    }

    isEdit.value = false
    emit('updated', updatedTask)
}

const undo = () => {
    isEdit.value = false
    editingTask.value = props.task.name
}

const markTaskAsCompleted = event => {
    const updatedTask = { ...props.task, is_completed: !props.task.is_completed }
    emit('completed', updatedTask)
}

const removeTask = () => {
    if (confirm("Are you sure?")) {
        emit('removed', props.task)
    }
}
</script>

<style scoped>
.form-check-input:checked {
    background-color: rgb(108,117,125);
    border-color: rgb(108,117,125);
}
.form-check-input:not(:checked) {
   outline: 0;
   border: 0;
}
.priority-high:not(:checked) {
   box-shadow: 0 0 0 0.1rem rgb(220,53,69) !important;
}
.priority-medium:not(:checked) {
   box-shadow: 0 0 0 0.1rem rgb(255,193,7) !important;
}
.priority-low:not(:checked) {
   box-shadow: 0 0 0 0.1rem rgb(13,110,253) !important;
}
.priority-none:not(:checked) {
   box-shadow: 0 0 0 0.1rem rgba(0,0,0,.25) !important;
}
</style>