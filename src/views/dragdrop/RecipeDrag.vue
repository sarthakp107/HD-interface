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
              @remove="onRecipeRemoved(day)"
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

    <!-- Global Trash Bin outside days loop -->
    <div
      class="trash-bin card text-center p-3 my-4 border border-danger rounded"
      style="min-height: 100px"
    >
      <h5>Drag Here to Delete</h5>
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
          <div class="card bg-danger text-white p-2 small">
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
      console.log(`Deleted "${draggedRecipe.title}" from ${day}`);
      break;
    }
  }
saveMealPlan(); 
  console.log("Meal plan after deletion:", JSON.stringify(mealPlan.value));

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
