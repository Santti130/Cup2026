export function renderCountdown() {
    const section = document.createElement('section')
    section.className = 'flex flex-col items-center justify-center py-20 gap-6'
    section.innerHTML = /*html*/`

        <h1 class="text-4xl font-bold text-white text-center">Faltan</h1>
        <!-- Contador -->
        <div class="flex gap-10 mt-4">
            <div class="flex flex-col items-center">
                <span id="days" class="text-6xl font-bold text-white rounded-xl">00</span>
                <span class="text-gray-400 text-sm uppercase tracking-widest mt-2">Días</span>
            </div>
            <div class="flex flex-col items-center">
                <span id="hours" class="text-6xl font-bold text-white">00</span>
                <span class="text-gray-400 text-sm uppercase tracking-widest mt-2">Horas</span>
            </div>
            <div class="flex flex-col items-center">
                <span id="minutes" class="text-6xl font-bold text-white">00</span>
                <span class="text-gray-400 text-sm uppercase tracking-widest mt-2">Minutos</span>
            </div>
            <div class="flex flex-col items-center">
                <span id="seconds" class="text-6xl font-bold text-white">00</span>
                <span class="text-gray-400 text-sm uppercase tracking-widest mt-2">Segundos</span>
            </div>
        </div>
        <h1 class="text-5xl font-bold text-white text-center">PARA EL INICIO DEL MUNDIAL 2026</h1>
        <p class="text-gray-400 text-center text-base">El encuentro de futbol mas importante esta por comenzar</p>
    `

    /* Lógica de la cuenta regresiva*/
    const worldCupDate = new Date('2026-06-11T20:00:00Z')

    /* Esta función calcula */
    function updateCountdown() {
        const now = new Date() // Momento exacto ahora
        const diff = worldCupDate - now // Diferencia en milisegundos

        const days = Math.floor(diff / (1000 * 60 * 60 * 24)) // Constante días va ser igual a la operación matematica de la diferencia en la constante diff entre la conversión de ms.
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)

        section.querySelector('#days').textContent = String(days).padStart(2, '0')
        section.querySelector('#hours').textContent = String(hours).padStart(2, '0')
        section.querySelector('#minutes').textContent = String(minutes).padStart(2, '0')
        section.querySelector('#seconds').textContent = String(seconds).padStart(2, '0')
    }
    updateCountdown() // Ejecuta una vez inmediatamente
    setInterval(updateCountdown, 1000) // Repite cada 1 segundo

    return section
}