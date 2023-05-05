<template>
  <div class="w-full max-w-xl p-12 mx-auto rounded-lg shadow-xl dark:bg-white/10 bg-white/30 ring-1 ring-gray-900/5 backdrop-blur-lg">
    <div class="flex items-center justify-between mb-4">
      <div class="space-y-1">
        <h2 class="text-xl font-semibold">My lines</h2>
      </div>
    </div>
    <div class="divide-y divide-gray-900/5">
      <div v-for="dbrecord in dbrecords" :key="dbrecord.id" class="flex items-center justify-between py-3">
        <div class="flex items-center space-x-4">
          <div class="space-y-1">
            <p class="font-medium leading-none">{{ dbrecord?.line_name }}</p>
            <p class="text-sm text-gray-500">{{ dbrecord?.pgn }}</p>
            <p class="text-sm text-gray-500">{{ dbrecord?.opening_name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dbrecords: {
      type: Array,
      required: true,
    }
  }
}
</script>
