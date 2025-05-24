import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

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
        const res = await fetch('https://mercury.swin.edu.au/cos30043/s104817068/hd-interface/InterfaceData/get_all_recipes.php')
        const result = await res.json()
        if (result.success) {
          this.recipes = result.recipes
        }
      } catch (error) {
        console.error('Error fetching recipes:', error)
      }
    },

    async fetchMealPlan() {
      try {
        const auth = useAuthStore()
        if (!auth.userId) {
          console.warn('User not logged in')
          return
        }
        const res = await fetch(`https://mercury.swin.edu.au/cos30043/s104817068/hd-interface/InterfaceData/get_mealplan.php?user_id=${auth.userId}`)
        const data = await res.json()
        if (data.success) {
          if (data.mealPlan) {
            this.mealPlan = data.mealPlan
          } else {
            // default empty meal plan if none saved
            this.mealPlan = {
              Monday: [],
              Tuesday: [],
              Wednesday: [],
              Thursday: [],
              Friday: [],
              Saturday: [],
              Sunday: [],
            }
          }
        }
      } catch (err) {
        console.error('Error fetching meal plan:', err)
      }
    },

    async saveMealPlan() {
      try {
        const auth = useAuthStore()
        if (!auth.userId) {
          console.warn('User not logged in')
          return
        }

        const res = await fetch('https://mercury.swin.edu.au/cos30043/s104817068/hd-interface/InterfaceData/saveMealPlan.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_id: auth.userId,
            mealPlan: this.mealPlan,
          }),
        })

        const data = await res.json()
        if (!data.success) {
          console.error('Failed to save meal plan:', data.message)
        }
      } catch (err) {
        console.error('Error saving meal plan:', err)
      }
    },

    addRecipeToDay(day, recipe) {

      this.mealPlan[day].push(recipe)
      this.saveMealPlan()
    },

    removeRecipeFromDay(day, index) {
      this.mealPlan[day].splice(index, 1)
      this.saveMealPlan()
    },
  },
})
