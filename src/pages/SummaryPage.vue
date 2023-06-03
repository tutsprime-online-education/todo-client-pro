<template>
    <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Page header -->
                    <div class="mb-3">
                        <h3 class="text-body mb-0">
                            Summary
                            <small class="text-muted">(Tasks this week)</small>
                        </h3>
                    </div>
                    <div v-for="(tasks, group) in summaries" :key="group">
                        <Summaries :tasks="tasks" :description="group" class="mb-3" />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useSummaryStore } from "../stores/summary";
import Summaries from "../components/summaries/Summaries.vue";

const store = useSummaryStore()
const { summaries } = storeToRefs(store)
const { fetchTasksSummary } = store

onMounted(async () => {
    await fetchTasksSummary();
})
</script>