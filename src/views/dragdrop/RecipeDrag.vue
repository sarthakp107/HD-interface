<template>
  <div class="container my-4">
    <h3 class="mb-3">
      <i class="bi bi-list-ul me-2"></i>Available Recipes
    </h3>

    <div class="row row-cols-2 row-cols-md-4 g-3 mb-4">
      <draggable
        :list="recipes"
        :group="{ name: 'recipes', pull: 'clone', put: false }"
        :clone="cloneRecipe"
        itemKey="id"
        class="d-flex flex-wrap gap-2"
      >
        <template #item="{ element }">
          <div
            class="card small-card text-center p-2 border-0 shadow-sm"
            style="cursor: grab; transition: transform 0.2s ease;"
            @mouseover="hover = true"
            @mouseleave="hover = false"
          >
            <strong class="text-primary">{{ element.title }}</strong>
          </div>
        </template>
      </draggable>
    </div>

    <h3 class="mb-4">
      <i class="bi bi-calendar-week me-2"></i>Meal Planner Calendar
    </h3>

    <div class="row row-cols-1 row-cols-md-4 g-4">
      <div class="col" v-for="(dayRecipes, day) in mealPlan" :key="day">
        <div class="card h-100 border-primary shadow-sm">
          <div class="card-header text-center fw-bold bg-gradient bg-primary text-white">
            {{ day }}
          </div>
          <div class="card-body">
            <draggable
              :list="mealPlan[day]"
              :group="{ name: 'recipes', pull: true, put: true }"
              itemKey="id"
              @add="saveMealPlan"
              @remove="onRecipeRemoved(day)"
              class="d-flex flex-column gap-2"
            >
              <template #item="{ element }">
                <div
                  class="card bg-success text-white text-center p-1 small shadow-sm"
                  style="cursor: move;"
                >
                  {{ element.title }}
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>
    </div>

    <!-- Trash Bin -->
    <div
      class="trash-bin card text-center p-4 my-5 border border-3 border-danger rounded-4 shadow-sm"
      style="min-height: 120px; background-color: #ffeaea;"
    >
      <h5 class="text-danger mb-3">
        <i class="bi bi-trash3-fill me-2"></i>Drag Here to Delete
      </h5>
      <draggable
        :list="trash"
        :group="{ name: 'recipes', pull: false, put: true }"
        itemKey="id"
        @add="onTrashAdd"
        class="trash-droppable"
        :clone="cloneRecipe"
        :sort="false"
      >
        <template #item="{ element }">
          <div class="card bg-danger text-white p-2 small shadow-sm">
            {{ element.title }}
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>


<script setup>
import draggable from "vuedraggable";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useMealPlannerStore } from "../../stores/mealPlannerStore";

const store = useMealPlannerStore();
const { recipes, mealPlan } = storeToRefs(store);
const { fetchRecipes, fetchMealPlan, saveMealPlan } = store;

fetchRecipes();
fetchMealPlan();

const trash = ref([]);

function cloneRecipe(recipe) {
  return { ...recipe };
}

function onRecipeRemoved(day) {
  return (event) => {
    if (!event.to || !event.to.__draggable_context) return;

    const toList = event.to.__draggable_context.list;
    if (toList === recipes.value) return; // dropped back to pool, ignore

    saveMealPlan();
  };
}


function onTrashAdd(event) {
  const draggedRecipe = event.clone;

  for (const day in mealPlan.value) {
    const index = mealPlan.value[day].findIndex(r => r.id === draggedRecipe.id);
    if (index !== -1) {
      store.removeRecipeFromDay(day, index);
      break;
    }
  }
  saveMealPlan(); 

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
.trash-bin {
  background-color: #ffe6e6;
  cursor: pointer;
  user-select: none;
}
</style>
