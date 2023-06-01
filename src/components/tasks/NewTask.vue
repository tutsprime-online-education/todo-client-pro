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
                    <DropdownItem @click.prevent="toggle()">
                        <span class="text-danger me-2">
                            <IconFlag />
                        </span>
                        High Priority
                    </DropdownItem>
                    <DropdownItem @click.prevent="toggle()">
                        <span class="text-warning me-2">
                            <IconFlag />
                        </span>
                        Medium Priority
                    </DropdownItem>
                    <DropdownItem @click.prevent="toggle()">
                        <span class="text-primary me-2">
                            <IconFlag />
                        </span>
                        Low Priority
                    </DropdownItem>
                    <DropdownItem @click.prevent="toggle()">
                        <span class="text-secondary me-2">
                            <IconFlag />
                        </span>
                        No Priority
                    </DropdownItem>
                </template>
            </Dropdown>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useTaskStore } from "../../stores/task";
import IconFlag from '../icons/IconFlag.vue';
import Dropdown from '../dropdown/Dropdown.vue';
import DropdownToggle from '../dropdown/DropdownToggle.vue';
import DropdownItem from '../dropdown/DropdownItem.vue';

const store = useTaskStore()
const { handleAddedTask } = store

const newTask = reactive({
    name: '',
    is_completed: false
})

const addNewTask = async(event) => {
    if (event.target.value.trim()) {
        newTask.name = event.target.value
        event.target.value = ""
        await handleAddedTask(newTask)
    }
}
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