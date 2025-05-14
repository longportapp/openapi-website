<script setup></script>
<template>
  <div class="border-b border-gray-300 text-center" style="background-color: #f8f9fa">
    <div
      class="flex flex-col md:flex-row max-w-4xl items-center gap-6 justify-between text-center md:text-left mx-auto px-6 md:px-0 py-10">
      <div class="gap-4">
        <p class="font-bold text-2xl">SDK</p>
        <p class="text-lg">
          {{ $frontmatter.description }}
        </p>
      </div>
      <div>
        <img class="w-[400px]" src="https://pub.lbkrs.com/files/202503/vEnnmgUM6bo362ya/sdk.svg" alt="" />
      </div>
    </div>
  </div>
</template>