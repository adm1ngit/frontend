<template>
  <main class="grid min-h-full rounded-xl bg-gray-800 m-5 place-items-center text-gray-50 px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="text-base font-semibold text-indigo-600">404</p>
      <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-200 sm:text-5xl">Page not found</h1>
      <p class="mt-6 text-base leading-7 text-gray-20">Sorry, we couldn’t find the page you’re looking for.</p>
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <a @click="directToHome"
          class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go
          back home</a>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    directToHome: function () {
      window.location = '/';
    },
  },
};
</script>