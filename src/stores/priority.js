import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { allPriorities } from "../http/priority-api";
import { extractPriorityFrom } from "../composables/usePriority";

export const usePriorityStore = defineStore("priorityStore", () => {
  const priorities = ref([]);

  const listPriorities = computed(() => {
    const flagMaps = {
      high: "text-danger",
      medium: "text-warning",
      low: "text-primary",
    };

    const noPriority = {
      id: null,
      name: "none",
      description: "No Priority",
      color: "text-secondary",
    };

    return priorities.value
      .map((priority) => {
        priority["color"] = flagMaps[priority.name];
        return priority;
      })
      .concat(noPriority);
  });

  const getPriorityByName = (name) =>
    listPriorities.value.find((priority) => priority.name === name);

  const getPriority = (text) => {
    const matches = extractPriorityFrom(text);
    return matches === null ? null : getPriorityByName(matches[2]);
  };

  const fetchAllPriorities = async () => {
    const { data } = await allPriorities();
    priorities.value = data.data;
  };

  return {
    listPriorities,
    getPriority,
    fetchAllPriorities,
  };
});
