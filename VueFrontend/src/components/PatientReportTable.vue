<script setup>
import { ref } from 'vue';

defineProps({
    items: {
        type: Array,
        required: true
    },
})

const emit = defineEmits(['search']);
const searchTerm = ref('');

const handleSearchInput = () => {
    // console.log(`Searcsh event emitted with: ${searchTerm.value}`);
    emit('search', searchTerm.value);
};

const formattedDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10); // YYYY-MM-DD
  } catch (error) {
    console.error("Error formatting date:", error, dateString);
    return 'Invalid Date';
  }
};

const reportRequiresAlert = (item) => {
    if (!item || !item.summary) return false;
    const summary = item.summary.toLowerCase();
    return summary.includes('tachycardia') || 
           summary.includes('arrhythmia');
}
</script>

<template>
    <div>
        <div style="display: flex; gap: 50px">
            <h2>Patient Reports</h2>
            <div style="display: flex; gap: 12px">
                <input 
                    v-model="searchTerm"
                    type="text" 
                    placeholder="Search" 
                    style="padding: 4px"
                    @keyup.enter="handleSearchInput"
                >
                <button
                    style="padding: 4px 12px" @click="handleSearchInput">Search
                </button>
            </div>  
        </div>

        <div v-if="items.length === 0" class="no-results">
            No results found
        </div>
        
        <table v-else class="reports-table">
            <thead>
                <tr>
                    <th>Report ID</th>
                    <th>Patient Name</th>
                    <th>Summary</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in items" :key="item">
                    <td class="padded-cell">{{ item.id }}</td>
                    <td class="padded-cell">{{ item.patient_name }}</td>
                    <td class="padded-cell">{{ item.summary }}</td>
                    <td class="padded-cell">{{ formattedDate(item.date)}}</td>
                    <td class="padded-cell">
                        <span
                            v-if="reportRequiresAlert(item)"
                            class="alert-span"
                            >
                            ALERT
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
.padded-cell {
  padding: 10px;
}

th, td {
  border: 1px solid #ddd; /* Optional: add borders to cells */
}

.reports-container {
  max-height: 400px; /* Adjust as needed */
  overflow-y: auto;  /* Enables scrolling when content overflows */
  border: 1px solid #ddd; /* Optional: adds a border for structure */
}

.alert-span {
  color: red;
  font-weight: bold;
}

</style>
  