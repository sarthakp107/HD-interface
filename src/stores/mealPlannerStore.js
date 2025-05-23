import { defineStore } from 'pinia';

export const useMealPlannerStore = defineStore('mealPlanner', {
  state: () => ({
    recipes: [], 
    mealPlan: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    },
  }),

  actions: {
    async fetchRecipes() {
      try {
        const response = await fetch('https://mercury.swin.edu.au/cos30043/s104817068/hd-interface/InterfaceData/get_all_recipes.php');
        const result = await response.json();
        if (result.success) {
          this.recipes = result.recipes;
        }
      } catch (err) {
        console.error('Error fetching recipes:', err);
      }
    },

    addRecipeToDay(day, recipe) {
      this.mealPlan[day].push(recipe);
    },

    removeRecipeFromDay(day, index) {
      this.mealPlan[day].splice(index, 1);
    },
  },
});
