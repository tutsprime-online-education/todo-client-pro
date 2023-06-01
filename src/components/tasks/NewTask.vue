<template>
    <div class="relative">
        <input type="text" 
            class="form-control form-control-lg padding-right-lg"
            placeholder="+ Add new task. Press enter to save." 
            @keydown.enter="addNewTask"
        />
        <div class="sort-priority">
            <div class="dropdown">
                <button class="btn btn-sm btn-light dropdown-toggle show" type="button" data-bs-toggle="dropdown" aria-expanded="false">                
                </button>
                <ul class="dropdown-menu show" style="position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate(0px, 40px);">
                    <li>
                        <a class="dropdown-item" href="#">
                            <span class="text-danger me-2">
                                <IconFlag />
                            </span>
                            High Priority
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="#">
                            <span class="text-warning me-2">
                                <IconFlag />
                            </span>
                            Medium Priority
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="#">
                            <span class="text-primary me-2">
                                <IconFlag />
                            </span>
                            Low Priority
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="#">
                            <span class="text-secondary me-2">
                                <IconFlag />
                            </span>
                            No Priority
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useTaskStore } from "../../stores/task";
import IconFlag from '../icons/IconFlag.vue';

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
    z-index: 1000;
}
</style>