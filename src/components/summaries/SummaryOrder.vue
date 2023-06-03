<template>
    <Dropdown>
        <template #toggle="{ toggle, toggleClass }">
            <DropdownToggle class="btn btn-outline-secondary" :class="toggleClass" @click="toggle" type="button">
                {{ currentFilter }}
            </DropdownToggle>
        </template>
        
        <template #menu="{ toggle }">
            <DropdownItem v-for="(value, key) in filterItems" @click.prevent="toggle(), sortSummaries(key)">{{ value }}</DropdownItem>
            <!-- <DropdownItem @click.prevent="toggle()">Yesterday</DropdownItem>
            <DropdownItem @click.prevent="toggle()">
                <span class="text-primary d-flex justify-content-between align-items-center">
                    This week
                    <IconCheck />
                </span>
            </DropdownItem>
            <DropdownItem @click.prevent="toggle()">Last week</DropdownItem>
            <DropdownItem @click.prevent="toggle()">This month</DropdownItem>
            <DropdownItem @click.prevent="toggle()">Last month</DropdownItem> -->
        </template>
    </Dropdown>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { subDays, format } from "date-fns";
import Dropdown from "../dropdown/Dropdown.vue";
import DropdownItem from "../dropdown/DropdownItem.vue";
import DropdownToggle from "../dropdown/DropdownToggle.vue";
import IconCheck from "../icons/IconCheck.vue";

const emit = defineEmits(['selected-filter'])

const router = useRouter();
const selectedFilterItem = ref('thisweek');

const sortSummaries = (from) => {
    selectedFilterItem.value = from
    router.push({ name: 'summary', query: { from }})
    emit('selected-filter', currentFilter.value)
}

const filterItems = computed(() => {
    const thisWeekStart = format(subDays(new Date(), 6), "d MMM");
    const thisWeekEnd = format(new Date(), "d MMM");
    
    const lastWeekStart = format(subDays(new Date(), 13), "d MMM");
    const lastWeekEnd = format(subDays(new Date(), 7), "d MMM");

    return {
        today: "Today",
        yesterday: "Yesterday",
        thisweek: `This Week (${thisWeekStart} - ${thisWeekEnd})`,
        lastweek: `Last Week (${lastWeekStart} - ${lastWeekEnd})`,
        thismonth: "This month",
        lastmonth: "Last month",
    }
  })

  const currentFilter = computed(() => {
    if (selectedFilterItem.value in filterItems.value) {
        return filterItems.value[selectedFilterItem.value];
    } else {
        filterItems.value.thisweek;
    }
  })

  onMounted(() => emit('selected-filter', currentFilter.value))
</script>