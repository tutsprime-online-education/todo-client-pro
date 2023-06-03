<template>
    <main style="min-height: 50vh; margin-top: 2rem;">
        <div class="container">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <!-- Page header -->
                    <div class="d-flex align-items-center justify-content-between mb-3">
                        <h3 class="text-body mb-0">
                            Summary
                            <small class="text-muted fs-5">{{ subTitle }}</small>
                        </h3>
                        <SummaryOrder @selected-filter="changeSubtitle" />
                    </div>
                    <div v-if="summaries.length === 0">
                        <p class="text-secondary">No tasks can be found with the current filters.</p>
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
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useSummaryStore } from "../stores/summary";
import Summaries from "../components/summaries/Summaries.vue";
import SummaryOrder from "../components/summaries/SummaryOrder.vue";

const subTitle = ref('')
const store = useSummaryStore()
const { summaries } = storeToRefs(store)
const { fetchTasksSummary } = store

onMounted(async () => {
    await fetchTasksSummary();
})

const route = useRoute();

watch(() => route.query, async (query) => await fetchTasksSummary(query))

const changeSubtitle = e => subTitle.value = e
</script>