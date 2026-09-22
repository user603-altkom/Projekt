let report;
let selectedRowKey = null;
const $ = id => document.getElementById(id);

const STATUS_META = {
  w_limicie: { text: 'W limicie', tagClass: 'tag-neutral', icon: '●' },
  brak_limitu: { text: 'Brak limitu', tagClass: 'tag-neutral', icon: '●' },
  przekroczenie: { text: 'Przekroczenie', tagClass: 'tag-accent-2', icon: '▲' },
  inna_waluta: { text: 'Wymaga decyzji', tagClass: 'tag-accent-2', icon: '▲' },
};

const plain = grosze => (grosze / 100).toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const money = (value, currency) => value === null ? 'Brak' : `${plain(value)} ${currency}`;

function el(tag, opts = {}, kids = []) {
  const e = document.createElement(tag);
  if (opts.class) e.className = opts.class;
  if (opts.text !== undefined) e.textContent = opts.text;
  if (opts.style) e.style.cssText = opts.style;
  if (opts.hidden) e.hidden = true;
  for (const k of kids) e.append(k);
  return e;
}

function statusTag(status) {
  const meta = STATUS_META[status];
  return el('span', { class: `tag ${meta.tagClass}` }, [
    el('span', { text: meta.icon, style: 'font-size:11px' }),
    el('span', { text: meta.text }),
  ]);
}

// Ćwiczenie MOST: filtruje wiersze wg statusu, nie zmienia raportu ani obliczeń.
function visibleRows(rows, onlyExceeded) {
  return onlyExceeded ? rows.filter(row => row.przekroczenieGrosze > 0) : rows;
}

function groupByAccount(rows) {
  const order = [];
  const map = new Map();
  for (const row of rows) {
    if (!map.has(row.nrRachunku)) { map.set(row.nrRachunku, []); order.push(row.nrRachunku); }
    map.get(row.nrRachunku).push(row);
  }
  return order.map(nrRachunku => ({ nrRachunku, rows: map.get(nrRachunku) }));
}

function buildChart(rows, limitGrosze) {
  const BAR_MAX_PX = 190;
  const LABEL_BOTTOM_GAP = 30;
  const maxVal = Math.max(limitGrosze, ...rows.map(r => r.wykorzystanieGrosze));
  const scale = maxVal > 0 ? BAR_MAX_PX / maxVal : 0;

  const plot = el('div', { class: 'chart-plot' });
  for (const row of rows) {
    const totalPx = Math.round(row.wykorzystanieGrosze * scale);
    const overPx = Math.round(row.przekroczenieGrosze * scale);
    const underPx = Math.max(0, totalPx - overPx);
    const stack = el('div', { class: 'chart-stack' });
    if (overPx > 0) stack.append(el('div', { class: 'chart-seg-over', style: `height:${overPx}px` }));
    stack.append(el('div', { class: 'chart-seg-under', style: `height:${underPx}px` }));
    plot.append(el('div', { class: 'chart-col' }, [
      el('div', { class: 'chart-value', text: plain(row.wykorzystanieGrosze) }),
      stack,
      el('div', { class: 'chart-label', text: row.id }),
    ]));
  }
  const limitBottom = LABEL_BOTTOM_GAP + Math.round(limitGrosze * scale);
  plot.append(el('div', { class: 'chart-limit-line', style: `bottom:${limitBottom}px` }));
  plot.append(el('div', { class: 'chart-limit-text', style: `bottom:${limitBottom + 6}px`, text: `Limit ${plain(limitGrosze)}` }));

  const last = rows[rows.length - 1];
  const legend = el('div', { class: 'chart-legend' }, [
    el('div', { class: 'chart-legend-row' }, [
      el('span', { class: 'chart-swatch', style: 'background:var(--color-accent)' }),
      el('span', { text: 'Wykorzystanie w ramach limitu' }),
    ]),
    el('div', { class: 'chart-legend-row' }, [
      el('span', { class: 'chart-swatch', style: 'background:var(--color-accent-2)' }),
      el('span', { text: 'Część ponad limit' }),
    ]),
    el('div', { class: 'chart-legend-total' }, [
      el('span', { class: 'label', text: `Łączne przekroczenie po ${last.id}` }),
      el('span', { class: 'value', text: plain(last.przekroczenieGrosze) }),
    ]),
  ]);

  const wrap = el('div', { class: 'chart' }, [
    el('div', { class: 'eyebrow', text: 'Wykorzystanie limitu narastająco — wykres słupkowy' }),
    el('div', { class: 'chart-bars', style: 'margin-top:18px' }, [plot, legend]),
    el('div', { class: 'chart-note', text: 'Słupki pokazują wykorzystanie narastająco po każdej operacji. Wykres dotyczy całej partii i nie zmienia się przy filtrowaniu wierszy.' }),
  ]);
  return wrap;
}

function showDetails(row) {
  selectedRowKey = row.nrRachunku + '|' + row.id;
  const wcze = row.wykorzystanieGrosze - row.kwotaGrosze;
  const rows = [
    ['Wcześniejsze obciążenia', money(wcze, row.waluta), false],
    ['Ta operacja', money(row.kwotaGrosze, row.waluta), false],
    ['Razem', money(row.wykorzystanieGrosze, row.waluta), true],
    ['Limit', money(row.limitGrosze, row.waluta), true],
    ['Przekroczenie', row.limitGrosze === null ? 'Brak' : money(row.przekroczenieGrosze, row.waluta), row.przekroczenieGrosze > 0 ? 'over' : true],
  ];
  const body = el('div', {}, [
    el('h2', { text: row.id }),
    el('div', { style: 'margin-top:8px' }, [statusTag(row.status)]),
    el('div', { class: 'detail-rows' }, rows.map(([k, v, strong]) => el('div', { class: 'detail-row' }, [
      el('span', { class: 'k', text: k }),
      el('span', { class: `v${strong === 'over' ? ' over' : strong ? ' strong' : ''}`, text: v }),
    ]))),
    el('p', { class: 'detail-explain', text: row.powod }),
    el('div', { style: 'margin-top:24px' }, [(() => {
      const btn = el('button', { class: 'btn btn-secondary', text: 'Zamknij szczegóły' });
      btn.addEventListener('click', closeDetails);
      return btn;
    })()]),
  ]);
  $('details-body').replaceChildren(body);
}

function closeDetails() {
  selectedRowKey = null;
  $('details-body').replaceChildren(
    el('p', { class: 'details-placeholder', text: 'Wybierz „Szczegóły” przy operacji, aby zobaczyć, jak powstało jej wykorzystanie i przekroczenie.' })
  );
}

function buildBatch(nrRachunku, allRows, onlyExceeded) {
  const visible = visibleRows(allRows, onlyExceeded);
  if (visible.length === 0) return null;

  const sameCurrency = allRows.every(r => r.waluta === allRows[0].waluta);
  const sameLimit = allRows.every(r => r.limitGrosze === allRows[0].limitGrosze);
  const currency = sameCurrency ? allRows[0].waluta : null;
  const hasNumericLimit = sameLimit && allRows[0].limitGrosze !== null && allRows[0].limitGrosze > 0;

  const titleText = currency ? `Rachunek ${nrRachunku} · ${currency}` : `Rachunek ${nrRachunku}`;
  const metaText = hasNumericLimit
    ? `Limit partii: ${plain(allRows[0].limitGrosze)} ${currency} · ${allRows.length} operacji · kolejność ${allRows[0].id} → ${allRows[allRows.length - 1].id}`
    : `Limit zależny od operacji · ${allRows.length} operacji`;

  const head = el('div', { class: 'batch-head' }, [
    el('div', {}, [
      el('div', { class: 'eyebrow', text: 'Partia rozliczeniowa' }),
      el('div', { class: 'batch-title' }, [el('span', { class: 'batch-account', text: titleText })]),
      el('div', { class: 'batch-meta', text: metaText }),
    ]),
  ]);

  const thead = el('thead', {}, [
    el('tr', { class: 'group-row' }, [
      el('th', {}), el('th', { text: currency ? `Kwoty w ${currency}` : 'Kwoty', attrs: {} }), el('th', {}),
    ]),
    (() => {
      const tr = document.createElement('tr');
      tr.className = 'col-row';
      const cols = ['Operacja', 'Kwota operacji', 'Wykorzystanie narastająco', 'Limit', 'Przekroczenie', 'Status', ''];
      cols.forEach((c, i) => {
        const th = document.createElement('th');
        th.textContent = c;
        if (i === 4) th.className = 'col-over';
        if (i === 5) th.className = 'col-status';
        tr.append(th);
      });
      return tr;
    })(),
  ]);
  // colspan fix for the grouping header row
  thead.querySelector('.group-row th:nth-child(2)').colSpan = 3;
  thead.querySelector('.group-row th:nth-child(3)').colSpan = 3;

  const tbody = document.createElement('tbody');
  for (const row of visible) {
    const tr = document.createElement('tr');
    tr.append(
      el('td', { class: 'col-op', text: row.id }),
      el('td', { class: 'col-amount', text: `${plain(row.kwotaGrosze)}${currency ? '' : ' ' + row.waluta}` }),
      el('td', { class: 'col-usage', text: `${plain(row.wykorzystanieGrosze)}${currency ? '' : ' ' + row.waluta}` }),
      el('td', { class: 'col-limit', text: row.limitGrosze === null ? '—' : `${plain(row.limitGrosze)}${currency ? '' : ' ' + row.waluta}` }),
      el('td', { class: `col-over ${row.limitGrosze === null ? '' : row.przekroczenieGrosze > 0 ? 'is-over' : 'is-clear'}`, text: row.limitGrosze === null ? '—' : plain(row.przekroczenieGrosze) }),
      el('td', {}, [statusTag(row.status)]),
    );
    const detailsTd = document.createElement('td');
    detailsTd.className = 'col-details';
    const btn = el('button', { class: 'btn btn-ghost', text: 'Szczegóły' });
    btn.setAttribute('aria-label', `Szczegóły ${row.id}`);
    btn.addEventListener('click', () => showDetails(row));
    detailsTd.append(btn);
    tr.append(detailsTd);
    tbody.append(tr);
  }

  const table = el('table', {}, [thead, tbody]);
  const tableScroll = el('div', { class: 'table-scroll' }, [table]);
  const parts = [head, tableScroll];
  if (hasNumericLimit) parts.push(buildChart(allRows, allRows[0].limitGrosze));
  return el('section', { class: 'batch' }, parts);
}

function updateModeTag() {
  const tag = $('mode-tag');
  if (!report) { tag.hidden = true; return; }
  if (report.tryb === 'demo') { tag.hidden = false; tag.className = 'tag tag-accent-2'; tag.textContent = 'Dane demonstracyjne'; }
  else if (report.tryb === 'plik') { tag.hidden = false; tag.className = 'tag tag-neutral'; tag.textContent = `Plik: ${report.zrodlo}`; }
  else if (report.stan === 'gotowe') { tag.hidden = false; tag.className = 'tag tag-neutral'; tag.textContent = 'Dane z repozytorium'; }
  else { tag.hidden = true; }
}

function render() {
  $('batches').replaceChildren();
  closeDetails();
  const ready = report.stan === 'gotowe';
  updateModeTag();
  $('mode').textContent = report.tryb === 'demo'
    ? 'DEMO: wzorcowe dane do projektowania. Ten widok nie potwierdza działania integracji.'
    : ready ? `DANE Z REPO / EKSPORTU: ${report.zrodlo}`
    : 'Raport odczytuje dane repo, ale moduł limitów nie jest jeszcze podłączony. Brak wyniku nie oznacza braku przekroczeń.';

  const onlyExceeded = $('only').checked;
  const batches = ready ? groupByAccount(report.wiersze) : [];
  const sections = batches.map(b => buildBatch(b.nrRachunku, b.rows, onlyExceeded)).filter(Boolean);
  $('batches').append(...sections);

  const visibleCount = sections.reduce((sum, section) => sum + section.querySelectorAll('tbody tr').length, 0);
  $('summary').textContent = `Operacji wejściowych: ${report.liczbaOperacji}. Widocznych wierszy: ${visibleCount}.`;
  $('empty').hidden = !ready || visibleCount > 0;
}

function validate(value) {
  if (!value || !['gotowe', 'niepodlaczone'].includes(value.stan) || !Number.isInteger(value.liczbaOperacji) || value.liczbaOperacji < 0 || !Array.isArray(value.wiersze)) throw new Error('Niepoprawny kontrakt raportu');
  for (const row of value.wiersze) {
    if (!['PLN', 'EUR', 'USD'].includes(row.waluta) || !Object.hasOwn(STATUS_META, row.status)) throw new Error('Nieznana waluta lub status');
    for (const key of ['id', 'nrRachunku', 'dataWaluty', 'powod']) if (typeof row[key] !== 'string') throw new Error(`Brak pola ${key}`);
    for (const key of ['kwotaGrosze', 'wykorzystanieGrosze', 'przekroczenieGrosze']) if (!Number.isSafeInteger(row[key]) || row[key] < 0) throw new Error(`Niepoprawne grosze: ${key}`);
    if (row.limitGrosze !== null && (!Number.isSafeInteger(row.limitGrosze) || row.limitGrosze < 0)) throw new Error('Niepoprawny limit');
  }
  return value;
}

function failure(error) {
  report = undefined;
  $('batches').replaceChildren();
  closeDetails();
  $('empty').hidden = true;
  $('summary').textContent = '';
  $('mode-tag').hidden = true;
  $('mode').textContent = `Nie udało się odczytać raportu: ${error.message}`;
}

async function load() {
  $('upload').hidden = $('source').value !== 'plik';
  if ($('source').value === 'plik') { $('upload').value = ''; failure(new Error('wybierz lokalny plik JSON')); return; }
  try {
    const response = await fetch(`/api/${$('source').value}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    report = validate(await response.json());
    render();
  } catch (error) { failure(error); }
}

$('only').addEventListener('change', () => { if (report) render(); });
$('source').addEventListener('change', load);
$('refresh').addEventListener('click', load);
$('upload').addEventListener('change', async () => {
  try {
    const file = $('upload').files[0];
    if (!file) return;
    report = validate(JSON.parse(await file.text()));
    report.tryb = 'plik';
    report.zrodlo = file.name;
    render();
  } catch (error) { failure(error); }
});
load();
