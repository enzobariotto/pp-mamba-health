<template>
  <!-- barra de navegação fixa no topo de todas as páginas -->
  <nav class="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">

    <!-- nome/logo da aplicação -->
    <span class="text-lg font-bold">Health Tracker</span>

    <!-- links de navegação entre as três páginas -->
    <div class="flex gap-6">

      <!-- RouterLink funciona como <a> mas sem recarregar a página -->
      <!-- active-class é aplicado automaticamente pelo Vue Router na rota atual -->
      <RouterLink
        to="/jejum"
        class="hover:text-emerald-400 transition-colors"
        active-class="text-emerald-400 font-semibold"
      >
        Jejum
      </RouterLink>

      <RouterLink
        to="/nutricao"
        class="hover:text-emerald-400 transition-colors"
        active-class="text-emerald-400 font-semibold"
      >
        Nutrição
      </RouterLink>

      <RouterLink
        to="/dashboard"
        class="hover:text-emerald-400 transition-colors"
        active-class="text-emerald-400 font-semibold"
      >
        Dashboard
      </RouterLink>
    </div>
  </nav>
</template>