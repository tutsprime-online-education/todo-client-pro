<template>
    <Dropdown>
        <template #toggle="{ toggle, toggleClass }">
            <DropdownToggle class="btn btn-light" :class="toggleClass" @click="toggle" type="button" hide-caret>
                <IconArrowDownUp />
            </DropdownToggle>
        </template>
        
        <template #menu="{ toggle }">
            <DropdownItem @click.prevent="toggle">Sort by time</DropdownItem>
            <DropdownItem @click.prevent="toggle">Sort by name</DropdownItem>
            <DropdownItem @click.prevent="toggle">Sort by priority</DropdownItem>
        </template>
    </Dropdown>
</template>

<script setup>
import Dropdown from "../dropdown/Dropdown.vue";
import DropdownItem from "../dropdown/DropdownItem.vue";
import DropdownToggle from "../dropdown/DropdownToggle.vue";
import IconArrowDownUp from "../icons/IconArrowDownUp.vue";
</script>