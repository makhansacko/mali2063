<script lang="ts">
  import { t } from '$lib/i18n';
  import type { LightStatus } from '$lib/suivi/calc';
  import type { MessageKey } from '$lib/i18n/messages';

  export let status: LightStatus;

  const keys: Record<LightStatus, MessageKey> = {
    green: 'suivi.status.green',
    amber: 'suivi.status.amber',
    red: 'suivi.status.red',
    gray: 'suivi.status.gray'
  };
</script>

<span class="badge {status}">{$t(keys[status])}</span>
