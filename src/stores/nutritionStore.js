import {defineStore} from 'pinia'
import {ref, computed} from 'vue'

export const useNutritionStore = defineStore ('nutrition', () =>{

    // valor padrão da meta calórica — declarado antes de ser usado no ref()
    const meta = 2000

    // estado reativo: meta diária de calorias (inicializa com o valor padrão)
    const dailyGoal = ref(meta)

    // estado reativo: lista de todas as refeições registradas (todos os dias)
    const meals = ref([])

    // carrega os dados salvos no localStorage ao iniciar a store
    function loadFromStorage() {
        const saved = localStorage.getItem('nutrition')
        if (saved) {
            const data = JSON.parse(saved)
            // se não houver meta salva, usa o valor padrão
            dailyGoal.value = data.dailyGoal ?? meta
            meals.value = data.meals ?? []
        }
    }

    // salva o estado atual no localStorage sempre que chamado
    function saveToStorage() {
        localStorage.setItem('nutrition', JSON.stringify({
            dailyGoal: dailyGoal.value,
            meals: meals.value,
        }))
    }

    // atualiza a meta diária de calorias e persiste no localStorage
    function setDailyGoal(kcal){
        dailyGoal.value = kcal
        saveToStorage()
    }

    // adiciona uma nova refeição no início da lista e salva
    function addMeal(name, calories){
        meals.value.unshift({
            id: Date.now(),     // id único baseado no timestamp
            name,
            calories,
            date: new Date().toISOString(),
        })
        saveToStorage()
    }

    // remove uma refeição pelo id e salva
    function removeMeal(id){
        meals.value = meals.value.filter(m => m.id !== id)
        saveToStorage()
    }

    // computed: filtra apenas as refeições registradas hoje
    // recalcula automaticamente sempre que meals mudar
    const todayMeals = computed(() => {
        const today = new Date().toDateString()
        return meals.value.filter(m => new Date(m.date).toDateString() === today)
    })

    // computed: soma as calorias das refeições de hoje
    // depende de todayMeals, então também atualiza automaticamente
    const todayCalories = computed(() =>
        todayMeals.value.reduce((sum, m) => sum + m.calories, 0)
    )

    // executa ao inicializar a store para restaurar os dados persistidos
    loadFromStorage()

    return { dailyGoal, meals, todayMeals, todayCalories, setDailyGoal, addMeal, removeMeal }
})