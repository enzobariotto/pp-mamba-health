<template>
  <!-- container principal: fundo escuro ocupando a altura toda da tela -->
  <div class="min-h-screen bg-gray-950 text-white">

    <!-- navbar é renderizada em todas as páginas pois está fora do RouterView -->
    <NavBar />

    <!-- RouterView renderiza o componente da rota atual (JejumPage, NutricaoPage ou DashboardPage) -->
    <!-- max-w-4xl limita a largura do conteúdo e mx-auto centraliza na tela -->
    <main class="max-w-4xl mx-auto px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
// importa o componente de navegação
import NavBar from '@/components/NavBar.vue'
</script>