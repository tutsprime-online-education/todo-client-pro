<template>
    <Dropdown>
        <template #toggle="{ toggle, toggleClass }">
            <DropdownToggle class="btn btn-outline-secondary" :class="toggleClass" @click="toggle" type="button">
                This Week
            </DropdownToggle>
        </template>
        
        <template #menu="{ toggle }">
            <DropdownItem @click.prevent="toggle()">Today</DropdownItem>
            <DropdownItem @click.prevent="toggle()">Yesterday</DropdownItem>
            <DropdownItem @click.prevent="toggle()">
                <span class="text-primary d-flex justify-content-between align-items-center">
                    This week
                    <IconCheck />
                </span>
            </DropdownItem>
            <DropdownItem @click.prevent="toggle()">Last week</DropdownItem>
            <DropdownItem @click.prevent="toggle()">This month</DropdownItem>
            <DropdownItem @click.prevent="toggle()">Last month</DropdownItem>
        </template>
    </Dropdown>
</template>

<script setup>
import { useRouter } from "vue-router";
import Dropdown from "../dropdown/Dropdown.vue";
import DropdownItem from "../dropdown/DropdownItem.vue";
import DropdownToggle from "../dropdown/DropdownToggle.vue";
import IconCheck from "../icons/IconCheck.vue";

const router = useRouter();

const sortSummaries = (from, to = null) => {
    router.push({ name: 'summary', query: { from, to }})
}
</script>