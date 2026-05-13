import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFastingStore = defineStore('fasting', () => {

    // estado reativo: jejum em andamento, ou null se não há nenhum ativo
    const activeFast = ref(null)

    // estado reativo: lista de todos os jejuns finalizados
    const history = ref([])

    // carrega os dados salvos no localStorage ao iniciar a store
    function loadFromStorage() {
        const saved = localStorage.getItem('fasting')
        if (saved) {
            const data = JSON.parse(saved)
            // se não houver jejum ativo salvo, mantém null
            activeFast.value = data.activeFast ?? null
            history.value = data.history ?? []
        }
    }

    // salva o estado atual no localStorage sempre que chamado
    function saveToStorage() {
        localStorage.setItem('fasting', JSON.stringify({
            activeFast: activeFast.value,
            history: history.value,
        }))
    }

    // inicia um novo jejum registrando o horário de início e a duração alvo
    function startFast(durationHours) {
        activeFast.value = {
            startTime: new Date().toISOString(),
            targetHours: durationHours,
        }
        saveToStorage()
    }

    // encerra o jejum ativo, move para o histórico e limpa o estado ativo
    function endFast() {
        if (!activeFast.value) return
        history.value.unshift({
            startTime: activeFast.value.startTime,
            endTime: new Date().toISOString(),
            targetHours: activeFast.value.targetHours,
        })
        activeFast.value = null
        saveToStorage()
    }

    // computed: retorna true se há um jejum ativo no momento
    // recalcula automaticamente sempre que activeFast mudar
    const isFasting = computed(() => activeFast.value !== null)

    // executa ao inicializar a store para restaurar os dados persistidos
    loadFromStorage()

    return { activeFast, history, isFasting, startFast, endFast }
})