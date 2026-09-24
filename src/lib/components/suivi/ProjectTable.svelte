<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { locale, t } from '$lib/i18n';
  import { interpolate } from '$lib/i18n/messages';
  import { formatSuiviNumber } from '$lib/suivi/format';
  import type { TrackedProject } from '$lib/data/suivi';
  import Badge from './Badge.svelte';

  export let projects: TrackedProject[];

  const dispatch = createEventDispatcher<{ open: string }>();
</script>

<div class="table-wrap">
  <table>
    <thead>
      <tr>
        <th>{$t('suivi.col.project')}</th>
        <th>{$t('suivi.col.progress')}</th>
        <th>{$t('suivi.col.spend')}</th>
        <th>{$t('suivi.col.status')}</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {#if projects.length === 0}
        <tr>
          <td colspan="5" class="empty">{$t('suivi.noProjects')}</td>
        </tr>
      {:else}
        {#each projects as project (project.id)}
          <tr class="clickable">
            <td>
              <button class="link-btn" type="button" on:click={() => dispatch('open', project.id)}>
                {project.name}
              </button>
              <br />
              <small>{project.nameFr}</small>
            </td>
            <td>
              <div class="mini-progress">
                <div class="bar"><i style="width: {project.actual}%"></i></div>
                <strong>{project.actual}%</strong>
              </div>
              <small>
                {interpolate($t('suivi.plannedGap'), {
                  plan: String(project.plan),
                  gap: String(project.actual - project.plan)
                })}
              </small>
            </td>
            <td>
              <strong>
                {formatSuiviNumber((project.budget * project.spent) / 100, $locale)} /
                {project.budget}
              </strong>
              <small>
                {interpolate($t('suivi.spendMeta'), { spent: String(project.spent) })}
              </small>
            </td>
            <td><Badge status={project.status} /></td>
            <td>
              <button
                class="button"
                type="button"
                aria-label={interpolate($t('suivi.openProjectAria'), { name: project.name })}
                on:click={() => dispatch('open', project.id)}
              >
                ↗
              </button>
            </td>
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>
