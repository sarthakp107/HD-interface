<template>
  <div class="container my-4">
    <h3 class="mb-3">Available Recipes</h3>

    <div class="row row-cols-2 row-cols-md-4 g-3 mb-4">
      <draggable
        :list="recipes"
        :group="{ name: 'recipes', pull: 'clone', put: false }"
        :clone="cloneRecipe"
        itemKey="id"
        class="d-flex flex-wrap gap-2"
      >
        <template #item="{ element }">
          <div class="card small-card text-center p-2">
            <strong>{{ element.title }}</strong>
          </div>
        </template>
      </draggable>
    </div>

    <h3 class="mb-4">Meal Planner Calendar</h3>

    <div class="row row-cols-1 row-cols-md-4 g-4">
      <div class="col" v-for="(dayRecipes, day) in mealPlan" :key="day">
        <div class="card h-100">
          <div class="card-header text-center fw-bold bg-primary text-white">
            {{ day }}
          </div>
          <div class="card-body">
            <draggable
              :list="mealPlan[day]"
              :group="{ name: 'recipes', pull: true, put: true }"
              itemKey="id"
              @add="saveMealPlan"
              class="d-flex flex-column gap-2"
            >
              <template #item="{ element }">
                <div class="card bg-success text-white text-center p-1 small">
                  {{ element.title }}
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import draggable from "vuedraggable";
import { storeToRefs } from "pinia";
import { useMealPlannerStore } from "../../stores/mealPlannerStore";

const store = useMealPlannerStore();
const { recipes, mealPlan } = storeToRefs(store);
const { fetchRecipes, fetchMealPlan, saveMealPlan } = store;

fetchRecipes();
fetchMealPlan();

function cloneRecipe(recipe) {
  return { ...recipe}
}

</script>

<style scoped>
.small-card {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  font-size: 0.85rem;
  width: 100px;
  cursor: grab;
}
</style>
