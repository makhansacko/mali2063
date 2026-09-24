<script lang="ts">
  import { tick } from 'svelte';
  import { locale, t } from '$lib/i18n';
  import { interpolate } from '$lib/i18n/messages';
  import { getIndicators, getProjects } from '$lib/data/vision-i18n';
  import {
    getTrackedIndicators,
    getTrackedProjects,
    initialActions,
    pickLang,
    type ActionState,
    type SuiviAction,
    type TrackedIndicator,
    type TrackedProject
  } from '$lib/data/suivi';
  import { NEXT_REVIEW, REVIEW_AS_OF, isOverdue } from '$lib/suivi/calc';
  import { csvEscape, formatIsoDate, formatSuiviNumber } from '$lib/suivi/format';
  import Badge from '$lib/components/suivi/Badge.svelte';
  import KpiCard from '$lib/components/suivi/KpiCard.svelte';
  import CurveChart from '$lib/components/suivi/CurveChart.svelte';
  import ActionList from '$lib/components/suivi/ActionList.svelte';
  import ProjectTable from '$lib/components/suivi/ProjectTable.svelte';
  import '$lib/components/suivi/suivi.css';
  import type { MessageKey } from '$lib/i18n/messages';

  type Tab = 'overview' | 'indicators' | 'projects' | 'reviews' | 'method';
  type Dialog =
    | { type: 'project'; id: string }
    | { type: 'indicator'; id: string }
    | { type: 'action'; id: number }
    | null;

  const tabs: Array<{ id: Tab; icon: string; label: MessageKey }> = [
    { id: 'overview', icon: '◫', label: 'suivi.tab.overview' },
    { id: 'indicators', icon: '↗', label: 'suivi.tab.indicators' },
    { id: 'projects', icon: '▤', label: 'suivi.tab.projects' },
    { id: 'reviews', icon: '◷', label: 'suivi.tab.reviews' },
    { id: 'method', icon: 'ⓘ', label: 'suivi.tab.method' }
  ];

  const titles: Record<Tab, [MessageKey, MessageKey]> = {
    overview: ['suivi.title.overview', 'suivi.sub.overview'],
    indicators: ['suivi.title.indicators', 'suivi.sub.indicators'],
    projects: ['suivi.title.projects', 'suivi.sub.projects'],
    reviews: ['suivi.title.reviews', 'suivi.sub.reviews'],
    method: ['suivi.title.method', 'suivi.sub.method']
  };

  let tab: Tab = 'overview';
  let sector = 'all';
  let statusFilter: 'all' | 'red' | 'amber' | 'green' | 'gray' = 'all';
  let actions: SuiviAction[] = initialActions.map((action) => ({ ...action }));
  let dialog: Dialog = null;
  let dialogEl: HTMLDialogElement | undefined;
  let toast = '';
  let toastTimer: ReturnType<typeof setTimeout> | undefined;

  let formOwner = '';
  let formDue = '';
  let formState: ActionState = 'open';
  let formNote = '';

  $: localizedProjects = getProjects($locale);
  $: localizedIndicators = getIndicators($locale);
  $: allProjects = getTrackedProjects(localizedProjects);
  $: allIndicators = getTrackedIndicators(localizedIndicators);

  $: filteredProjects = allProjects.filter(
    (project) =>
      (sector === 'all' || project.id === sector) &&
      (statusFilter === 'all' || project.status === statusFilter)
  );
  $: filteredIndicators = allIndicators.filter((indicator) => {
    const project = allProjects.find((item) => item.id === indicator.projectId);
    if (!project) return false;
    if (sector !== 'all' && project.id !== sector) return false;
    return statusFilter === 'all' || indicator.status === statusFilter;
  });
  $: filteredActions = actions.filter((action) => {
    const project = allProjects.find((item) => item.id === action.projectId);
    if (!project) return false;
    if (sector !== 'all' && project.id !== sector) return false;
    return statusFilter === 'all' || project.status === statusFilter;
  });

  $: featured = filteredIndicators.find((indicator) => indicator.actual != null);
  $: spendAhead = filteredProjects.filter((project) => project.spent > project.actual + 10).length;

  function projectFromDialog(
    current: Dialog,
    list: TrackedProject[]
  ): TrackedProject | undefined {
    if (current?.type !== 'project') return undefined;
    return list.find((item) => item.id === current.id);
  }

  function indicatorFromDialog(
    current: Dialog,
    list: TrackedIndicator[]
  ): TrackedIndicator | undefined {
    if (current?.type !== 'indicator') return undefined;
    return list.find((item) => item.id === current.id);
  }

  function actionFromDialog(current: Dialog, list: SuiviAction[]): SuiviAction | undefined {
    if (current?.type !== 'action') return undefined;
    return list.find((item) => item.id === current.id);
  }

  $: dialogProject = projectFromDialog(dialog, allProjects);
  $: dialogIndicator = indicatorFromDialog(dialog, allIndicators);
  $: dialogAction = actionFromDialog(dialog, actions);
  $: dialogLinked = dialogProject
    ? allIndicators.filter((indicator) => indicator.projectId === dialogProject.id)
    : [];
  $: dialogActionProject = dialogAction
    ? allProjects.find((item) => item.id === dialogAction.projectId)
    : undefined;
  $: dialogActionList = dialogProject
    ? actions.filter((action) => action.projectId === dialogProject.id)
    : [];

  function go(next: Tab) {
    tab = next;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function openDialog(next: Dialog) {
    dialog = next;
    if (next?.type === 'action') {
      const action = actions.find((item) => item.id === next.id);
      if (action) {
        formOwner = pickLang(action.owner, $locale);
        formDue = action.due;
        formState = action.state;
        formNote = action.note ?? '';
      }
    }
    await tick();
    if (dialogEl && !dialogEl.open) dialogEl.showModal();
  }

  function closeDialog() {
    dialogEl?.close();
    dialog = null;
  }

  function showToast(message: string) {
    toast = message;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast = '';
    }, 3500);
  }

  function saveAction() {
    if (!dialogAction || !formOwner.trim() || !formNote.trim()) return;
    actions = actions.map((action) =>
      action.id === dialogAction.id
        ? {
            ...action,
            owner: { fr: formOwner.trim(), en: formOwner.trim() },
            due: formDue,
            state: formState,
            note: formNote.trim()
          }
        : action
    );
    closeDialog();
    showToast($t('suivi.toastSaved'));
  }

  function barColor(status: TrackedProject['status']): string {
    if (status === 'red') return '#bd5357';
    if (status === 'amber') return '#c99a43';
    return 'var(--color-green)';
  }

  function projectForIndicator(indicator: TrackedIndicator): TrackedProject | undefined {
    return allProjects.find((project) => project.id === indicator.projectId);
  }

  function exportCsv() {
    const rows: Array<Array<string | number | null>> = [
      [$t('suivi.csvBanner')],
      [
        $t('suivi.csv.type'),
        $t('suivi.csv.label'),
        $t('suivi.csv.actual'),
        $t('suivi.csv.expected'),
        $t('suivi.csv.unit'),
        $t('suivi.csv.target'),
        $t('suivi.csv.status'),
        $t('suivi.csv.owner'),
        $t('suivi.csv.due'),
        $t('suivi.csv.decision')
      ]
    ];
    const statusLabel = {
      green: $t('suivi.status.green'),
      amber: $t('suivi.status.amber'),
      red: $t('suivi.status.red'),
      gray: $t('suivi.status.gray')
    };
    const stateLabel = {
      open: $t('suivi.action.open'),
      progress: $t('suivi.action.progress'),
      done: $t('suivi.action.done')
    };
    for (const indicator of filteredIndicators) {
      rows.push([
        $t('suivi.csv.indicator'),
        indicator.label,
        indicator.actual,
        indicator.expected,
        indicator.unit,
        indicator.targets[2033],
        statusLabel[indicator.status],
        '',
        '',
        ''
      ]);
    }
    for (const project of filteredProjects) {
      rows.push([
        $t('suivi.csv.project'),
        project.name,
        project.actual,
        project.plan,
        '%',
        '',
        statusLabel[project.status],
        pickLang(project.owner, $locale),
        '',
        ''
      ]);
    }
    for (const action of filteredActions) {
      rows.push([
        $t('suivi.csv.action'),
        pickLang(action.title, $locale),
        '',
        '',
        '',
        '',
        stateLabel[action.state],
        pickLang(action.owner, $locale),
        action.due,
        action.note ?? ''
      ]);
    }
    const blob = new Blob(
      ['\ufeff' + rows.map((row) => row.map(csvEscape).join(';')).join('\r\n')],
      { type: 'text/csv;charset=utf-8' }
    );
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'SNEDD_demo_donnees_simulees.csv';
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
  }
</script>

<svelte:head>
  <title>{$t('suivi.metaTitle')}</title>
  <meta name="description" content={$t('suivi.metaDesc')} />
</svelte:head>

<div class="suivi-shell">
  <aside class="suivi-aside">
    <div class="suivi-tricolor" aria-hidden="true"><i></i><i></i><i></i></div>
    <div class="suivi-brand">mali<span>2063</span></div>
    <div class="small" style="color:#9eb4bf;margin-top:5px">{$t('suivi.workspace')}</div>
    <div class="aside-label">{$t('suivi.asideLabel')}</div>
    <nav class="suivi-nav" aria-label={$t('suivi.navAria')}>
      {#each tabs as item}
        <button
          type="button"
          class:active={tab === item.id}
          aria-current={tab === item.id ? 'page' : undefined}
          on:click={() => go(item.id)}
        >
          <b>{item.icon}</b>
          {$t(item.label)}
        </button>
      {/each}
    </nav>
    <div class="aside-bottom">
      <strong>{$t('suivi.asideTagline')}</strong>
      {$t('suivi.asideHorizon')}<br />
      {interpolate($t('suivi.asideReview'), { date: formatIsoDate(REVIEW_AS_OF, $locale) })}<br />
      <br />
      {$t('suivi.asideDemo')}
    </div>
  </aside>

  <div class="suivi-main">
    <div class="suivi-topbar">
      <span>{$t('suivi.crumb')}</span>
      <span class="suivi-demo">{$t('suivi.simulated')}</span>
    </div>

    <div class="suivi-content">
      <div class="heading">
        <div>
          <h1>{$t(titles[tab][0])}</h1>
          <p class="muted">{$t(titles[tab][1])}</p>
        </div>
        <button class="button" type="button" on:click={exportCsv}>{$t('suivi.export')}</button>
      </div>

      {#if tab !== 'method'}
        <div class="filters">
          <label for="sector">{$t('suivi.filterScope')}</label>
          <select id="sector" bind:value={sector}>
            <option value="all">{$t('suivi.filterAllProjects')}</option>
            {#each allProjects as project}
              <option value={project.id}>{project.name}</option>
            {/each}
          </select>
          <label for="status">{$t('suivi.filterStatus')}</label>
          <select id="status" bind:value={statusFilter}>
            <option value="all">{$t('suivi.filterAllStatus')}</option>
            <option value="red">{$t('suivi.status.red')}</option>
            <option value="amber">{$t('suivi.status.amber')}</option>
            <option value="green">{$t('suivi.status.green')}</option>
            <option value="gray">{$t('suivi.status.gray')}</option>
          </select>
          <span class="small muted" style="margin-left:auto">
            {interpolate($t('suivi.asOf'), { date: formatIsoDate(REVIEW_AS_OF, $locale) })}
          </span>
        </div>
      {/if}

      {#if tab === 'overview'}
        <div class="kpis">
          <KpiCard
            label={$t('suivi.kpi.projects')}
            value={String(filteredProjects.length)}
            note={$t('suivi.kpi.projectsNote')}
          />
          <KpiCard
            label={$t('suivi.kpi.late')}
            value={String(filteredProjects.filter((project) => project.status === 'red').length)}
            note={$t('suivi.kpi.lateNote')}
          />
          <KpiCard
            label={$t('suivi.kpi.onTrack')}
            value={`${filteredIndicators.filter((item) => item.status === 'green').length}/${filteredIndicators.filter((item) => item.actual != null).length}`}
            note={$t('suivi.kpi.onTrackNote')}
          />
          <KpiCard
            label={$t('suivi.kpi.open')}
            value={String(filteredActions.filter((action) => action.state === 'open').length)}
            note={$t('suivi.kpi.openNote')}
          />
        </div>

        <div class="split">
          <section class="panel">
            <div class="panel-head">
              <div>
                <div class="small muted">{$t('suivi.priorityLabel')}</div>
                <h2>{featured ? featured.label : $t('suivi.noIndicator')}</h2>
              </div>
              {#if featured}<Badge status={featured.status} />{/if}
            </div>
            <div class="panel-body">
              {#if featured}
                <div class="spaced">
                  <div>
                    <strong style="font-size:28px">
                      {formatSuiviNumber(featured.actual, $locale)}
                      {featured.unit}
                    </strong>
                    <div class="small muted">{$t('suivi.actual2026')}</div>
                  </div>
                  <div style="text-align:right">
                    <strong>
                      {formatSuiviNumber(featured.expected, $locale)}
                      {featured.unit}
                    </strong>
                    <div class="small muted">{$t('suivi.expected2026')}</div>
                  </div>
                </div>
                <CurveChart indicator={featured} />
                <div class="signal">
                  {featured.status === 'green' ? $t('suivi.keepPace') : $t('suivi.examineGap')}
                  {$t('suivi.target2033')}
                  <strong>
                    {formatSuiviNumber(featured.targets[2033], $locale)}
                    {featured.unit}
                  </strong>.
                </div>
              {:else}
                <div class="empty">{$t('suivi.changeFilters')}</div>
              {/if}
            </div>
          </section>

          <section class="panel">
            <div class="panel-head">
              <div>
                <div class="small muted">{$t('suivi.executionLabel')}</div>
                <h2>{$t('suivi.deliveredVsPlan')}</h2>
              </div>
              <span class="small muted">{$t('suivi.physicalPct')}</span>
            </div>
            <div class="panel-body">
              {#each filteredProjects.slice(0, 6) as project (project.id)}
                <div class="progress-row">
                  <button
                    class="link-btn"
                    type="button"
                    style="font-size:12px"
                    on:click={() => openDialog({ type: 'project', id: project.id })}
                  >
                    {project.name}
                  </button>
                  <div class="bar">
                    <i style="width:{project.actual}%;background:{barColor(project.status)}"></i>
                    <em style="left:{project.plan}%"></em>
                  </div>
                  <strong>{project.actual}%</strong>
                </div>
              {:else}
                <div class="empty">{$t('suivi.noProjects')}</div>
              {/each}
              <div class="legend">
                <span>{$t('suivi.barActual')}</span>
                <span>{$t('suivi.barPlan')}</span>
              </div>
              <div class="signal">
                {interpolate($t('suivi.spendSignal'), { n: String(spendAhead) })}
              </div>
            </div>
          </section>
        </div>

        <div class="split">
          <section class="panel">
            <div class="panel-head">
              <h2>{$t('suivi.blockers')}</h2>
              <button class="link-btn" type="button" on:click={() => go('reviews')}>
                {$t('suivi.openReview')}
              </button>
            </div>
            <ActionList
              actions={filteredActions.filter((action) => action.state !== 'done').slice(0, 3)}
              projects={allProjects}
              short
              on:examine={(event) => openDialog({ type: 'action', id: event.detail })}
            />
          </section>
          <section class="panel">
            <div class="panel-head"><h2>{$t('suivi.cadence')}</h2></div>
            <div class="panel-body">
              <div class="small muted">{$t('suivi.nextReviewLabel')}</div>
              <h2 style="font-size:25px;margin:7px 0 18px">
                {formatIsoDate(NEXT_REVIEW, $locale)}
              </h2>
              <p>
                <strong>{$t('suivi.step1')}</strong><br />
                <span class="muted">{$t('suivi.step1desc')}</span>
              </p>
              <p>
                <strong>{$t('suivi.step2')}</strong><br />
                <span class="muted">{$t('suivi.step2desc')}</span>
              </p>
              <p>
                <strong>{$t('suivi.step3')}</strong><br />
                <span class="muted">{$t('suivi.step3desc')}</span>
              </p>
              <button class="button primary" type="button" on:click={() => go('reviews')}>
                {$t('suivi.prepare')}
              </button>
            </div>
          </section>
        </div>
      {/if}

      {#if tab === 'indicators'}
        <div class="indicator-grid">
          {#each filteredIndicators as indicator (indicator.id)}
            {@const project = projectForIndicator(indicator)}
            <section class="panel">
              <div class="panel-body">
                <div class="spaced">
                  <span class="small muted">{project?.name ?? ''}</span>
                  <Badge status={indicator.status} />
                </div>
                <h2 style="margin-top:14px">{indicator.label}</h2>
                <div class="ind-value">
                  {formatSuiviNumber(indicator.actual, $locale)}
                  <small>{indicator.actual == null ? '' : indicator.unit}</small>
                </div>
                <div class="small muted">
                  {$t('suivi.expected2026Short')}
                  {formatSuiviNumber(indicator.expected, $locale)}
                  {indicator.unit}
                </div>
                <CurveChart {indicator} full={false} />
                <div class="spaced small">
                  <span>
                    {$t('suivi.reference')} {indicator.baselineYear}<br />
                    <strong>{formatSuiviNumber(indicator.baseline, $locale)} {indicator.unit}</strong>
                  </span>
                  <span style="text-align:right">
                    {$t('suivi.targetYear')}<br />
                    <strong>
                      {formatSuiviNumber(indicator.targets[2033], $locale)}
                      {indicator.unit}
                    </strong>
                  </span>
                </div>
                <p class="small muted" style="margin:16px 0">
                  {$t('suivi.desiredDirection')} :
                  {indicator.targets[2033] < indicator.baseline
                    ? $t('suivi.decrease')
                    : $t('suivi.increase')}<br />
                  {$t('suivi.updated')} :
                  {indicator.updatedAt
                    ? formatIsoDate(indicator.updatedAt, $locale)
                    : $t('suivi.notReported')}
                </p>
                <button
                  class="link-btn"
                  type="button"
                  on:click={() => openDialog({ type: 'indicator', id: indicator.id })}
                >
                  {$t('suivi.definition')}
                </button>
              </div>
            </section>
          {:else}
            <div class="empty">{$t('suivi.noIndicators')}</div>
          {/each}
        </div>
      {/if}

      {#if tab === 'projects'}
        <section class="panel">
          <div class="panel-head">
            <h2>
              {interpolate(
                $t(
                  filteredProjects.length === 1
                    ? 'suivi.projectInScope'
                    : 'suivi.projectsInScope'
                ),
                { n: String(filteredProjects.length) }
              )}
            </h2>
            <span class="small muted">{$t('suivi.clickMilestones')}</span>
          </div>
          <ProjectTable
            projects={filteredProjects}
            on:open={(event) => openDialog({ type: 'project', id: event.detail })}
          />
        </section>
      {/if}

      {#if tab === 'reviews'}
        <div class="kpis">
          <KpiCard
            label={$t('suivi.kpi.openActions')}
            value={String(filteredActions.filter((action) => action.state !== 'done').length)}
            note={$t('suivi.kpi.inScope')}
          />
          <KpiCard
            label={$t('suivi.kpi.toDecide')}
            value={String(filteredActions.filter((action) => action.state === 'open').length)}
            note={$t('suivi.kpi.decisionDue')}
          />
          <KpiCard
            label={$t('suivi.kpi.overdue')}
            value={String(
              filteredActions.filter((action) => isOverdue(action.due) && action.state !== 'done')
                .length
            )}
            note={interpolate($t('suivi.asOf'), { date: formatIsoDate(REVIEW_AS_OF, $locale) })}
          />
          <KpiCard
            label={$t('suivi.kpi.closed')}
            value={String(filteredActions.filter((action) => action.state === 'done').length)}
            note={$t('suivi.kpi.thisSession')}
          />
        </div>
        <div class="signal" style="margin-bottom:22px">
          {interpolate($t('suivi.reviewBanner'), {
            asOf: formatIsoDate(REVIEW_AS_OF, $locale),
            next: formatIsoDate(NEXT_REVIEW, $locale)
          })}
        </div>
        <section class="panel">
          <div class="panel-head">
            <h2>{$t('suivi.registry')}</h2>
            <button class="button" type="button" on:click={() => window.print()}>
              {$t('suivi.print')}
            </button>
          </div>
          <ActionList
            actions={filteredActions}
            projects={allProjects}
            on:examine={(event) => openDialog({ type: 'action', id: event.detail })}
          />
        </section>
      {/if}

      {#if tab === 'method'}
        <section class="panel method">
          <div class="panel-body">
            <h2>{$t('suivi.method.h2')}</h2>
            <p style="margin-top:16px">{$t('suivi.method.p1')}</p>
            <h3>{$t('suivi.method.twoLevels')}</h3>
            <ul>
              <li>{$t('suivi.method.results')}</li>
              <li>{$t('suivi.method.execution')}</li>
            </ul>
            <h3>{$t('suivi.method.origin')}</h3>
            <p>{$t('suivi.method.originP1')}</p>
            <p>{$t('suivi.method.originP2')}</p>
            <h3>{$t('suivi.method.trajectory')}</h3>
            <p>{$t('suivi.method.trajectoryP1')}</p>
            <p>{$t('suivi.method.trajectoryP2')}</p>
            <h3>{$t('suivi.method.projects')}</h3>
            <p>{$t('suivi.method.projectsP')}</p>
            <h3>{$t('suivi.method.routines')}</h3>
            <ul>
              <li>{$t('suivi.method.r1')}</li>
              <li>{$t('suivi.method.r2')}</li>
              <li>{$t('suivi.method.r3')}</li>
              <li>{$t('suivi.method.r4')}</li>
            </ul>
            <h3>{$t('suivi.method.next')}</h3>
            <p>{$t('suivi.method.nextP')}</p>
          </div>
        </section>
      {/if}

      <div class="notice">{$t('suivi.notice')}</div>
    </div>
  </div>
</div>

<dialog
  class="suivi-dialog"
  bind:this={dialogEl}
  on:click={(event) => {
    if (event.target === dialogEl) closeDialog();
  }}
  on:close={() => (dialog = null)}
>
  {#if dialogProject}
    <div class="panel-head">
      <h2 id="dialog-title">{dialogProject.name}</h2>
      <button class="close" type="button" aria-label={$t('suivi.close')} on:click={closeDialog}>×</button>
    </div>
    <div class="panel-body">
      <p class="muted">{dialogProject.nameFr}</p>
      <Badge status={dialogProject.status} />
      <p style="margin-top:16px">{dialogProject.description}</p>
      <div class="metric-box">
        <div class="spaced">
          <span>
            {$t('suivi.physical')} :
            <strong>{dialogProject.actual}% / {dialogProject.plan}% {$t('suivi.planned')}</strong>
          </span>
          <span>
            {$t('suivi.disbursed')} : <strong>{dialogProject.spent}%</strong>
          </span>
        </div>
      </div>
      <p>
        <strong>{$t('suivi.owner')} :</strong>
        {pickLang(dialogProject.owner, $locale)}<br />
        <strong>{$t('suivi.region')} :</strong>
        {pickLang(dialogProject.region, $locale)}
      </p>
      <h3>{$t('suivi.milestones')}</h3>
      <div class="timeline">
        <div class="mile done">
          <strong>{$t('suivi.mile.scope')}</strong>
          <small>{$t('suivi.mile.scopeDate')}</small>
        </div>
        <div class="mile done">
          <strong>{$t('suivi.mile.studies')}</strong>
          <small>{$t('suivi.mile.studiesDate')}</small>
        </div>
        <div class="mile {dialogProject.status === 'red' ? 'late' : 'done'}">
          <strong>{$t('suivi.mile.validation')}</strong>
          <small>
            {dialogProject.status === 'red' ? $t('suivi.mile.late') : $t('suivi.mile.done')}
          </small>
        </div>
        <div class="mile">
          <strong>{$t('suivi.mile.launch')}</strong>
          <small>{$t('suivi.mile.launchDate')}</small>
        </div>
      </div>
      <div class="signal">
        <strong>{$t('suivi.watchpoint')} :</strong>
        {pickLang(dialogProject.blocker, $locale)}
      </div>
      <h3 style="margin-top:22px">{$t('suivi.linkedResults')}</h3>
      {#each dialogLinked as indicator}
        <p>
          {indicator.label} :
          <strong>
            {formatSuiviNumber(indicator.actual, $locale)}
            {indicator.actual == null ? '' : indicator.unit}
          </strong>
          · {$t('suivi.targetYear')} :
          {formatSuiviNumber(indicator.targets[2033], $locale)}
        </p>
      {:else}
        <p class="muted">{$t('suivi.noLinked')}</p>
      {/each}
      <h3 style="margin-top:22px">{$t('suivi.linkedActions')}</h3>
      <ActionList
        actions={dialogActionList}
        projects={allProjects}
        short
        on:examine={(event) => openDialog({ type: 'action', id: event.detail })}
      />
    </div>
  {:else if dialogIndicator}
    <div class="panel-head">
      <h2 id="dialog-title">{dialogIndicator.label}</h2>
      <button class="close" type="button" aria-label={$t('suivi.close')} on:click={closeDialog}>×</button>
    </div>
    <div class="panel-body">
      <Badge status={dialogIndicator.status} />
      <div class="metric-box">
        {$t('suivi.reference')} {dialogIndicator.baselineYear} :
        <strong>
          {formatSuiviNumber(dialogIndicator.baseline, $locale)}
          {dialogIndicator.unit}
        </strong><br />
        {$t('suivi.expected2026')} :
        <strong>
          {formatSuiviNumber(dialogIndicator.expected, $locale)}
          {dialogIndicator.unit}
        </strong><br />
        {$t('suivi.actual2026')} :
        <strong>
          {formatSuiviNumber(dialogIndicator.actual, $locale)}
          {dialogIndicator.actual == null ? '' : dialogIndicator.unit}
        </strong><br />
        {$t('suivi.target2033')}
        <strong>
          {formatSuiviNumber(dialogIndicator.targets[2033], $locale)}
          {dialogIndicator.unit}
        </strong>
      </div>
      <CurveChart indicator={dialogIndicator} />
      <p style="margin-top:20px">
        {#if dialogIndicator.actual == null}
          {$t('suivi.noConclusion')}
        {:else}
          {$t('suivi.scoreLead')}
          <strong>{formatSuiviNumber(dialogIndicator.score, $locale)}%</strong>.
          {$t('suivi.gapLead')}
          <strong>
            {formatSuiviNumber(dialogIndicator.actual - dialogIndicator.expected, $locale)}
            {dialogIndicator.unit}
          </strong>.
          {dialogIndicator.targets[2033] < dialogIndicator.baseline
            ? $t('suivi.decreaseWanted')
            : $t('suivi.increaseWanted')}
        {/if}
      </p>
      <p class="small muted">{$t('suivi.indicatorSource')}</p>
    </div>
  {:else if dialogAction && dialogActionProject}
    <div class="panel-head">
      <h2 id="dialog-title">{$t('suivi.arbitration')}</h2>
      <button class="close" type="button" aria-label={$t('suivi.close')} on:click={closeDialog}>×</button>
    </div>
    <div class="panel-body">
      <h3>{pickLang(dialogAction.title, $locale)}</h3>
      <p class="muted">{dialogActionProject.name}</p>
      <div class="signal">{pickLang(dialogAction.effect, $locale)}</div>
      <form
        style="margin-top:22px"
        on:submit|preventDefault={saveAction}
      >
        <div class="form-grid">
          <label>
            {$t('suivi.owner')}
            <input bind:value={formOwner} required maxlength="100" />
          </label>
          <label>
            {$t('suivi.due')}
            <input type="date" bind:value={formDue} required />
          </label>
          <label>
            {$t('suivi.actionState')}
            <select bind:value={formState}>
              <option value="open">{$t('suivi.action.open')}</option>
              <option value="progress">{$t('suivi.action.progress')}</option>
              <option value="done">{$t('suivi.action.done')}</option>
            </select>
          </label>
          <label>
            {$t('suivi.decisionProof')}
            <input
              bind:value={formNote}
              placeholder={$t('suivi.decisionPlaceholder')}
              maxlength="300"
              required
            />
          </label>
        </div>
        <p class="small muted" style="margin:16px 0">{$t('suivi.sessionOnly')}</p>
        <button class="button primary" type="submit">{$t('suivi.saveSession')}</button>
      </form>
    </div>
  {/if}
</dialog>

{#if toast}
  <div class="toast" role="status">{toast}</div>
{/if}
