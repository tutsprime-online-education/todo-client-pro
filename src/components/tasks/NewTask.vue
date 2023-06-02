<template>
    <div class="relative">
        <input type="text" 
            class="form-control form-control-lg padding-right-lg"
            placeholder="+ Add new task. Press enter to save." 
            @keydown.enter="addNewTask"
            ref="inputRef"
        />
        <div class="sort-priority">
            <Dropdown>
                <template #toggle="{ toggleClass, toggle }">
                    <DropdownToggle tag="button" type="button" class="btn btn-sm btn-light" :class="toggleClass" @click="toggle"></DropdownToggle>
                </template>
                <template #menu="{ toggle }">
                    <DropdownItem 
                        @click.prevent="toggle(), setPriority(priority.id)" 
                        v-for="priority in listPriorities" 
                        :key="priority.name" 
                        :class="{ active: priority.id === newTask.priority_id}"
                    >
                        <span class="me-2" :class="priority.color">
                            <IconFlag />
                        </span>
                        {{ priority.description }}
                    </DropdownItem>
                </template>
            </Dropdown>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue';
import { storeToRefs } from "pinia";
import { useTaskStore } from "../../stores/task";
import { usePriorityStore } from "../../stores/priority";
import IconFlag from '../icons/IconFlag.vue';
import Dropdown from '../dropdown/Dropdown.vue';
import DropdownToggle from '../dropdown/DropdownToggle.vue';
import DropdownItem from '../dropdown/DropdownItem.vue';

const taskStore = useTaskStore()
const { handleAddedTask } = taskStore
const priorityStore = usePriorityStore()
const { listPriorities } = storeToRefs(priorityStore)
const { fetchAllPriorities, getPriority } = priorityStore
const inputRef = ref()

const newTask = reactive({
    name: '',
    is_completed: false,
    priority_id: null
})

const addNewTask = async(event) => {
    if (event.target.value.trim()) {
        newTask.name = event.target.value
        
        const priority = getPriority(newTask.name);
        if (priority) {
            newTask.priority_id = priority.id;
        }

        event.target.value = ""
        await handleAddedTask(newTask)

        newTask.priority_id = null;
    }
}

const setPriority = (id) => {
    newTask.priority_id = id
    inputRef.value.focus();
}

onMounted(async () => {
    await fetchAllPriorities()
})
</script>

<style scopded>
.relative {
    position: relative;
}

.sort-priority {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    padding-left: 10px;
    z-index: 999;
}

.dropdown-item.active {
    color:#1e2125;
    text-decoration: none;
    background-color:#f8f9fa;
}
</style>