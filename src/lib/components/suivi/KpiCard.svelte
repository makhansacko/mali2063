<script lang="ts">
  export let label: string;
  export let value: string;
  export let note: string;
</script>

<div class="kpi">
  <div class="kpi-label">{label}</div>
  <div class="value">{value}</div>
  <small class="muted">{note}</small>
</div>
