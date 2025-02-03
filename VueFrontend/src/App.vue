<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import PatientReportTable from './components/PatientReportTable.vue';
  import { fetchPatientReports } from './APIs/patientAPI';

  const patientReports = ref<string[]>([]);

  const loadPatientReports = async (searchTerm?: string) => {
    patientReports.value = await fetchPatientReports(searchTerm);
  };

  const handleSearch = async (searchTerm: string) => {
    loadPatientReports(searchTerm);
  };

  onMounted(loadPatientReports);
</script>

<template>
  <PatientReportTable
   :items="patientReports" 
   @search="handleSearch"
  />
</template>
