<script lang="ts">
    let mode: 'idea' | 'object' | null = null;
    let submitted = false;
    let loading = false;
  
    let form = {
      nom: '',
      email: '',
      pays: '',
      titre: '',
      description: '',
      axe: '',
      fichier: null as File | null
    };
  
    const axes = [
      'Axe 1 — Paix, Sécurité et Souveraineté',
      'Axe 2 — Gouvernance et Réformes',
      'Axe 3 — Transformation Économique',
      'Axe 4 — Capital Humain et Protection Sociale',
      'Axe 5 — Environnement et Résilience Climatique'
    ];
  
    function handleFile(e: Event) {
      const target = e.target as HTMLInputElement;
      if (target.files?.[0]) {
        form.fichier = target.files[0];
      }
    }
  
    async function submit() {
      loading = true;
      await new Promise(r => setTimeout(r, 1200));
      submitted = true;
      loading = false;
    }
  
    // --- ZOOM ---
    let isometricZoom = 1;
    const zoomStep = 0.25;
    const zoomMin = 0.75;
    const zoomMax = 2.5;
  
    function zoomIsometricIn() {
      isometricZoom = Math.min(zoomMax, Math.round((isometricZoom + zoomStep) * 100) / 100);
    }
  
    function zoomIsometricOut() {
      isometricZoom = Math.max(zoomMin, Math.round((isometricZoom - zoomStep) * 100) / 100);
    }
  
    // --- DRAG ---
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let cropEl: HTMLElement;
  
    function onMouseDown(e: MouseEvent) {
      if (isometricZoom <= 1) return;
      isDragging = true;
      startX = e.clientX + cropEl.scrollLeft;
      startY = e.clientY + cropEl.scrollTop;
      cropEl.style.cursor = 'grabbing';
    }
  
    function onMouseMove(e: MouseEvent) {
      if (!isDragging) return;
      e.preventDefault();
      cropEl.scrollLeft = startX - e.clientX;
      cropEl.scrollTop = startY - e.clientY;
    }
  
    function onMouseUp() {
      isDragging = false;
      cropEl.style.cursor = isometricZoom > 1 ? 'grab' : 'default';
    }
  
    function onTouchStart(e: TouchEvent) {
      if (isometricZoom <= 1) return;
      isDragging = true;
      startX = e.touches[0].clientX + cropEl.scrollLeft;
      startY = e.touches[0].clientY + cropEl.scrollTop;
    }
  
    function onTouchMove(e: TouchEvent) {
      if (!isDragging) return;
      cropEl.scrollLeft = startX - e.touches[0].clientX;
      cropEl.scrollTop = startY - e.touches[0].clientY;
    }
  
    function onTouchEnd() {
      isDragging = false;
    }
  
    $: cropCursor = isometricZoom > 1 ? 'grab' : 'default';
  </script>
  
  <svelte:head>
    <title>Contribuer à la Vision — mali2063.org</title>
  </svelte:head>
  
  <div class="construire-page">
  
    <a href="/" class="back-btn">
      <span class="back-arrow">←</span>
      <span>Accueil</span>
    </a>
  
    <!-- HERO -->
    <div class="construire-hero">
      <div class="container">
        <p class="label">Participation citoyenne</p>
        <h1>Bâtissons le Mali<br/>ensemble</h1>
        <p class="construire-desc">
          Cette illustration grandit avec les contributions des citoyens et de la diaspora.
          Chaque objet représente un élément de la Vision Mali Kura 2063.
          Soumets une idée ou un objet dessiné — les meilleures contributions
          seront intégrées à l'illustration collective.
        </p>
      </div>
    </div>
  
    <!-- SVG ISOMETRIC -->
    <div class="isometric-view">
      <div class="isometric-view-inner">
  
        <div class="isometric-zoom-bar">
          <span class="isometric-zoom-label">Zoom</span>
          <div class="isometric-zoom-controls">
            <button
              type="button"
              class="isometric-zoom-btn"
              on:click={zoomIsometricOut}
              disabled={isometricZoom <= zoomMin}
              aria-label="Réduire le zoom"
            >−</button>
            <span class="isometric-zoom-value" aria-live="polite">
              {Math.round(isometricZoom * 100)}%
            </span>
            <button
              type="button"
              class="isometric-zoom-btn"
              on:click={zoomIsometricIn}
              disabled={isometricZoom >= zoomMax}
              aria-label="Augmenter le zoom"
            >+</button>
          </div>
          {#if isometricZoom > 1}
            <span class="drag-hint">☞ Clique et glisse pour naviguer</span>
          {/if}
        </div>
  
        <!-- Custom pan/zoom viewport: role+label for AT; ignore = intentional pointer surface (not a native widget) -->
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <div
          class="isometric-crop"
          role="region"
          aria-label="Illustration isométrique Vision Mali 2063. Lorsque le zoom dépasse 100 %, cliquer et glisser pour vous déplacer dans l'image."
          style="--isometric-z: {isometricZoom}; cursor: {cropCursor}"
          bind:this={cropEl}
          on:mousedown={onMouseDown}
          on:mousemove={onMouseMove}
          on:mouseup={onMouseUp}
          on:mouseleave={onMouseUp}
          on:touchstart={onTouchStart}
          on:touchmove|preventDefault={onTouchMove}
          on:touchend={onTouchEnd}
        >
          <div class="isometric-zoom-layer">
            <img
            src="/isometric.svg"
            alt="Illustration isométrique Mali 2063 — collective"
            class="isometric-svg"
            loading="lazy"
            />
          </div>
        </div>
  
        <div class="isometric-caption">
          <p>
            <span class="isometric-count">1</span> objet contribué jusqu'ici —
            le tien pourrait être le prochain.
          </p>
        </div>
  
      </div>
    </div>
  
    <!-- CONTRIBUTION -->
    <div class="container construire-body">
  
      {#if submitted}
  
        <div class="confirmation">
          <div class="confirmation-icon">✦</div>
          <h2>Merci pour ta contribution !</h2>
          <p>
            Nous avons bien reçu ta soumission. L'équipe Sahel Analytics la
            reviewera et te contactera si elle est retenue pour intégration
            dans l'illustration collective.
          </p>
          <a href="/" class="btn-primary">Retour à la plateforme</a>
        </div>
  
      {:else if mode === null}
  
        <div class="mode-section">
          <h2>Comment veux-tu contribuer ?</h2>
          <p class="mode-desc">
            Deux façons de participer à la construction visuelle de la Vision Mali 2063.
          </p>
  
          <div class="mode-grid">
            <button class="mode-card" on:click={() => mode = 'idea'}>
              <div class="mode-card-icon">💡</div>
              <h3>Soumettre une idée</h3>
              <p>
                Tu as une idée d'objet qui représente un aspect de la Vision Mali 2063 ?
                Décris-le — l'équipe Sahel Analytics se charge de le dessiner
                si ton idée est retenue.
              </p>
              <span class="mode-card-cta">Proposer une idée →</span>
            </button>
  
            <button class="mode-card" on:click={() => mode = 'object'}>
              <div class="mode-card-icon">🎨</div>
              <h3>Soumettre un objet</h3>
              <p>
                Tu sais dessiner ou utiliser des outils de design ? Crée un objet
                isométrique inspiré de la Vision et soumets-le directement.
              </p>
              <span class="mode-card-cta">Soumettre un objet →</span>
            </button>
          </div>
  
          <div class="tools-info">
            <p class="tools-label">Outils recommandés pour créer un objet isométrique</p>
            <div class="tools-grid">
              <a href="https://canva.com" target="_blank" rel="noopener" class="tool-item">
                <span class="tool-name">Canva</span>
                <span class="tool-desc">Gratuit — templates isométriques disponibles</span>
              </a>
              <a href="https://figma.com" target="_blank" rel="noopener" class="tool-item">
                <span class="tool-name">Figma</span>
                <span class="tool-desc">Gratuit — plugins isométriques disponibles</span>
              </a>
              <a href="https://www.adobe.com/products/illustrator.html" target="_blank" rel="noopener" class="tool-item">
                <span class="tool-name">Illustrator</span>
                <span class="tool-desc">Professionnel — idéal pour le SVG isométrique</span>
              </a>
            </div>
          </div>
        </div>
  
      {:else}
  
        <div class="form-section">
          <button class="back-link" on:click={() => mode = null}>← Changer de mode</button>
  
          <h2>
            {mode === 'idea' ? "Soumettre une idée" : "Soumettre un objet isométrique"}
          </h2>
  
          <div class="form">
  
            <div class="form-group">
              <label class="form-label" for="contrib-nom">Nom complet *</label>
              <input
                id="contrib-nom"
                type="text"
                bind:value={form.nom}
                class="form-input"
                placeholder="Ton nom et prénom"
              />
            </div>
  
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="contrib-email">Email *</label>
                <input
                  id="contrib-email"
                  type="email"
                  bind:value={form.email}
                  class="form-input"
                  placeholder="ton@email.com"
                />
              </div>
              <div class="form-group">
                <label class="form-label" for="contrib-pays">Pays de résidence</label>
                <input
                  id="contrib-pays"
                  type="text"
                  bind:value={form.pays}
                  class="form-input"
                  placeholder="Mali, France, États-Unis..."
                />
              </div>
            </div>
  
            <div class="form-group">
              <label class="form-label" for="contrib-titre">Titre de ta contribution *</label>
              <input
                id="contrib-titre"
                type="text"
                bind:value={form.titre}
                class="form-input"
                placeholder="Ex: Une école rurale solaire, Un marché agro-industriel..."
              />
            </div>
  
            <div class="form-group">
              <label class="form-label" for="contrib-axe">Axe stratégique concerné *</label>
              <select id="contrib-axe" bind:value={form.axe} class="form-input">
                <option value="">Sélectionner un axe</option>
                {#each axes as axe}
                  <option value={axe}>{axe}</option>
                {/each}
              </select>
            </div>
  
            <div class="form-group">
              <label class="form-label" for="contrib-description">
                {mode === 'idea'
                  ? "Décris ton idée — pourquoi cet objet représente la Vision Mali 2063 ? *"
                  : "Décris ton objet — pourquoi ce choix, quelle inspiration ? *"}
              </label>
              <textarea
                id="contrib-description"
                bind:value={form.description}
                class="form-input form-textarea"
                rows="5"
                placeholder="Décris en détail ton idée ou objet, son lien avec la Vision..."
              ></textarea>
            </div>
  
            {#if mode === 'object'}
              <div class="form-group">
                <label class="form-label" for="fichier">Fichier SVG ou PNG de ton objet *</label>
                <div class="file-upload">
                  <input
                    type="file"
                    accept=".svg,.png,.ai"
                    on:change={handleFile}
                    class="file-input"
                    id="fichier"
                  />
                  <label for="fichier" class="file-label">
                    {form.fichier ? form.fichier.name : 'Choisir un fichier SVG, PNG ou AI'}
                  </label>
                </div>
                <p class="form-hint">Format SVG de préférence. Max 10MB.</p>
              </div>
            {/if}
  
            <button
              class="btn-submit"
              on:click={submit}
              disabled={!form.nom || !form.email || !form.titre || !form.axe || !form.description || loading}
            >
              {loading ? 'Envoi en cours...' : 'Soumettre ma contribution →'}
            </button>
  
            <p class="form-disclaimer">
              Toutes les contributions sont reviewées par l'équipe Sahel Analytics
              avant publication. En soumettant, tu acceptes que ta contribution
              puisse être intégrée à l'illustration collective de mali2063.org,
              avec crédit à ton nom.
            </p>
  
          </div>
        </div>
  
      {/if}
  
    </div>
  </div>
  
  <style>
    /* --- HERO --- */
    .construire-hero {
      background: var(--color-night);
      padding: 5rem 0 2.5rem;
    }
  
    .construire-hero h1 {
      color: white;
      font-size: clamp(2rem, 4vw, 3rem);
      line-height: 1.2;
      margin: 0.75rem 0 1.25rem;
    }
  
    .construire-hero .label {
      color: var(--color-sand);
      opacity: 1;
    }
  
    .construire-desc {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.95rem;
      line-height: 1.75;
      max-width: 580px;
    }
  
    /* --- BACK BUTTON --- */
    .back-btn {
      position: fixed;
      top: 5rem;
      left: 2rem;
      z-index: 100;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-family: var(--font-mono);
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.5);
      text-decoration: none;
      padding: 0.5rem 0.75rem;
      border: 1px solid rgba(255, 255, 255, 0.15);
      background: rgba(26, 46, 74, 0.6);
      backdrop-filter: blur(8px);
      transition: all 0.2s;
    }
  
    .back-btn:hover {
      color: white;
      border-color: rgba(255, 255, 255, 0.4);
      background: rgba(26, 46, 74, 0.85);
    }
  
    .back-arrow {
      font-size: 0.8rem;
    }
  
    /* --- ISOMETRIC --- */
    .isometric-view {
      background: #f9fbfa;
      border-bottom: 1px solid rgba(115, 101, 85, 0.1);
      padding: 1rem 0 2rem;
    }
  
    .isometric-view-inner {
      max-width: min(1200px, 100%);
      margin: 0 auto;
      padding: 0 1.25rem;
    }
  
    @media (min-width: 768px) {
      .isometric-view-inner {
        padding: 0 2rem;
      }
    }
  
    /* --- ZOOM BAR --- */
    .isometric-zoom-bar {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
      flex-wrap: wrap;
    }
  
    .isometric-zoom-label {
      font-family: var(--font-mono);
      font-size: 0.6rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-brown);
      opacity: 0.55;
    }
  
    .drag-hint {
      font-family: var(--font-mono);
      font-size: 0.6rem;
      color: var(--color-blue-deep);
      opacity: 0.7;
      letter-spacing: 0.04em;
      margin-right: auto;
      order: -1;
    }
  
    .isometric-zoom-controls {
      display: inline-flex;
      align-items: center;
      border: 1px solid rgba(115, 101, 85, 0.2);
      background: white;
    }
  
    .isometric-zoom-btn {
      font-family: var(--font-mono);
      font-size: 1.1rem;
      font-weight: 700;
      line-height: 1;
      width: 2.25rem;
      height: 2.25rem;
      padding: 0;
      border: none;
      background: transparent;
      color: var(--color-blue-deep);
      cursor: pointer;
      transition: background 0.15s;
    }
  
    .isometric-zoom-btn:hover:not(:disabled) {
      background: rgba(48, 88, 140, 0.08);
    }
  
    .isometric-zoom-btn:disabled {
      opacity: 0.25;
      cursor: not-allowed;
    }
  
    .isometric-zoom-value {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      font-weight: 700;
      min-width: 3rem;
      text-align: center;
      color: var(--color-night);
      letter-spacing: 0.04em;
      border-left: 1px solid rgba(115, 101, 85, 0.15);
      border-right: 1px solid rgba(115, 101, 85, 0.15);
      padding: 0 0.5rem;
      line-height: 2.25rem;
    }
  
    /* --- CROP / DRAG CONTAINER --- */
    .isometric-crop {
  width: 100%;
  height: clamp(500px, 80vh, 900px);
  overflow: auto;
  line-height: 0;
  border: 1px solid rgba(115, 101, 85, 0.12);
  background: #f4f6f5;
  -webkit-overflow-scrolling: touch;
  user-select: none;
  scrollbar-width: thin;
  scrollbar-color: rgba(115, 101, 85, 0.2) transparent;
}
  
    .isometric-crop::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
  
    .isometric-crop::-webkit-scrollbar-thumb {
      background: rgba(115, 101, 85, 0.2);
      border-radius: 2px;
    }
  
    .isometric-zoom-layer {
    flex: 0 0 auto;
    width: calc(100% * var(--isometric-z, 1));
    height: calc(100% * var(--isometric-z, 1));
    min-width: unset;
    min-height: unset;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    }
  
    .isometric-svg {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      object-position: center 100%;
      pointer-events: none;
      user-select: none;
      -webkit-user-drag: none;
    }
  
    .isometric-caption {
      text-align: center;
      margin-top: 1.5rem;
    }
  
    .isometric-caption p {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: var(--color-brown);
      opacity: 0.6;
      letter-spacing: 0.05em;
    }
  
    .isometric-count {
      font-weight: 700;
      color: var(--color-blue-deep);
      opacity: 1;
    }
  
    /* --- BODY --- */
    .construire-body {
      padding-top: 4rem;
      padding-bottom: 6rem;
    }
  
    /* --- CONFIRMATION --- */
    .confirmation {
      max-width: 520px;
      margin: 0 auto;
      text-align: center;
      padding: 4rem 0;
    }
  
    .confirmation-icon {
      font-size: 2rem;
      color: var(--color-sand);
      margin-bottom: 1.5rem;
    }
  
    .confirmation h2 {
      color: var(--color-night);
      margin-bottom: 1rem;
    }
  
    .confirmation p {
      color: #555;
      font-size: 0.9rem;
      line-height: 1.7;
      margin-bottom: 2rem;
    }
  
    /* --- MODE SELECTION --- */
    .mode-section h2 {
      color: var(--color-night);
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
  
    .mode-desc {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 2.5rem;
    }
  
    .mode-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 3rem;
    }
  
    .mode-card {
      background: white;
      border: 1px solid rgba(115, 101, 85, 0.15);
      padding: 2rem;
      text-align: left;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      transition: all 0.2s;
    }
  
    .mode-card:hover {
      border-color: var(--color-blue-deep);
      box-shadow: 0 4px 20px rgba(48, 88, 140, 0.08);
      transform: translateY(-2px);
    }
  
    .mode-card-icon {
      font-size: 1.75rem;
    }
  
    .mode-card h3 {
      font-size: 1.1rem;
      color: var(--color-night);
      margin: 0;
    }
  
    .mode-card p {
      font-size: 0.85rem;
      color: #666;
      line-height: 1.65;
      margin: 0;
      flex: 1;
    }
  
    .mode-card-cta {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--color-blue-deep);
      text-transform: uppercase;
      margin-top: 0.5rem;
    }
  
    /* --- TOOLS --- */
    .tools-info {
      border-top: 1px solid rgba(115, 101, 85, 0.1);
      padding-top: 2rem;
    }
  
    .tools-label {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-brown);
      opacity: 0.6;
      margin-bottom: 1rem;
    }
  
    .tools-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
  
    .tool-item {
      border: 1px solid rgba(115, 101, 85, 0.12);
      padding: 1rem 1.25rem;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      transition: border-color 0.2s;
    }
  
    .tool-item:hover {
      border-color: var(--color-blue-deep);
    }
  
    .tool-name {
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--color-night);
    }
  
    .tool-desc {
      font-size: 0.75rem;
      color: var(--color-brown);
      opacity: 0.7;
      line-height: 1.4;
    }
  
    /* --- FORM --- */
    .form-section h2 {
      color: var(--color-night);
      font-size: 1.5rem;
      margin-bottom: 2rem;
    }
  
    .back-link {
      background: none;
      border: none;
      font-family: var(--font-mono);
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--color-brown);
      cursor: pointer;
      padding: 0;
      margin-bottom: 1.5rem;
      display: inline-block;
      transition: color 0.2s;
    }
  
    .back-link:hover {
      color: var(--color-night);
    }
  
    .form {
      max-width: 640px;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
  
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
  
    .form-label {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--color-brown);
    }
  
    .form-input {
      border: 1px solid rgba(115, 101, 85, 0.2);
      padding: 0.75rem 1rem;
      font-family: var(--font-body);
      font-size: 0.88rem;
      color: var(--color-night);
      background: #f9fbfa;
      outline: none;
      transition: border-color 0.2s;
      width: 100%;
      box-sizing: border-box;
    }
  
    .form-input:focus {
      border-color: var(--color-blue-deep);
    }
  
    .form-textarea {
      resize: vertical;
      min-height: 120px;
    }
  
    .form-hint {
      font-size: 0.72rem;
      color: var(--color-brown);
      opacity: 0.6;
      margin: 0;
    }
  
    /* --- FILE UPLOAD --- */
    .file-upload {
      position: relative;
    }
  
    .file-input {
      position: absolute;
      inset: 0;
      opacity: 0;
      cursor: pointer;
      width: 100%;
    }
  
    .file-label {
      display: block;
      border: 1px dashed rgba(115, 101, 85, 0.3);
      padding: 1rem;
      font-size: 0.85rem;
      color: var(--color-brown);
      background: #f9fbfa;
      cursor: pointer;
      transition: border-color 0.2s;
    }
  
    .file-label:hover {
      border-color: var(--color-blue-deep);
    }
  
    /* --- SUBMIT --- */
    .btn-submit {
      background: var(--color-blue-deep);
      color: white;
      border: none;
      padding: 1rem 2rem;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      cursor: pointer;
      transition: background 0.2s;
      align-self: flex-start;
    }
  
    .btn-submit:hover:not(:disabled) {
      background: var(--color-night);
    }
  
    .btn-submit:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  
    .btn-primary {
      display: inline-block;
      background: var(--color-blue-deep);
      color: white;
      text-decoration: none;
      padding: 0.8rem 1.5rem;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      transition: background 0.2s;
    }
  
    .btn-primary:hover {
      background: var(--color-night);
    }
  
    .form-disclaimer {
      font-size: 0.75rem;
      color: var(--color-brown);
      opacity: 0.6;
      line-height: 1.6;
      border-left: 2px solid rgba(115, 101, 85, 0.2);
      padding-left: 1rem;
      margin: 0;
    }
  
    /* --- RESPONSIVE --- */
    @media (max-width: 768px) {
      .mode-grid { grid-template-columns: 1fr; }
      .tools-grid { grid-template-columns: 1fr; }
      .form-row { grid-template-columns: 1fr; }
    }
  </style>