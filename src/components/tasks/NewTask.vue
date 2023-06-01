<template>
    <div class="relative">
        <input type="text" 
            class="form-control form-control-lg padding-right-lg"
            placeholder="+ Add new task. Press enter to save." 
            @keydown.enter="addNewTask"
        />
        <div class="sort-priority">
            <Dropdown>
                <template #toggle="{ toggleClass, toggle }">
                    <DropdownToggle tag="button" type="button" class="btn btn-sm btn-light" :class="toggleClass" @click="toggle"></DropdownToggle>
                </template>
                <template #menu="{ toggle }">
                    <DropdownItem @click.prevent="toggle(), setPriority(priority.id)" v-for="priority in listPriorities" :key="priority.name">
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
import { reactive, onMounted } from 'vue';
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
const { fetchAllPriorities } = priorityStore

const newTask = reactive({
    name: '',
    is_completed: false,
    priority_id: null
})

const addNewTask = async(event) => {
    if (event.target.value.trim()) {
        newTask.name = event.target.value
        event.target.value = ""
        await handleAddedTask(newTask)
    }
}

const setPriority = (id) => newTask.priority_id = id

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
</style>