import { defineStore } from 'pinia';
import { useAuthStore } from './auth'; // adjust path if needed

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

    async saveMealPlan() {
      try {
        const authStore = useAuthStore();
        const userId = authStore.userId;

        if (!userId) {
          alert('User not authenticated');
          return;
        }

        const response = await fetch('https://mercury.swin.edu.au/cos30043/s104817068/hd-interface/InterfaceData/saveMealPlan.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
            meal_plan: this.mealPlan,
          }),
        });

        const result = await response.json();

        if (!result.success) {
          console.error('Save failed:', result.message);
          alert('Save failed: ' + result.message);
        } else {
          alert('Meal plan saved successfully!');
        }
      } catch (err) {
        console.error('Error saving meal plan:', err);
        alert('Error saving meal plan');
      }
    },
  },
});
