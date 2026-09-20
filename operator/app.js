let report;
const $ = id => document.getElementById(id);
const labels = { w_limicie: 'W limicie', przekroczenie: 'Przekroczenie', brak_limitu: 'Brak limitu', inna_waluta: 'Wymaga decyzji' };
const money = (value, currency) => value === null ? 'Brak' : new Intl.NumberFormat('pl-PL', { style: 'currency', currency }).format(value / 100);

// Ćwiczenie MOST: checkbox istnieje. Dopisz filtrowanie bez zmiany raportu i obliczeń.
function visibleRows(rows, onlyExceeded) {
  return rows;
}

function render() {
  $('rows').replaceChildren(); $('details').hidden = true;
  const ready = report.stan === 'gotowe';
  $('mode').textContent = report.tryb === 'demo'
    ? 'DEMO: wzorcowe dane do projektowania. Ten widok nie potwierdza działania integracji.'
    : ready ? `DANE Z REPO / EKSPORTU: ${report.zrodlo}`
    : 'Raport odczytuje dane repo, ale moduł limitów nie jest jeszcze podłączony. Brak wyniku nie oznacza braku przekroczeń.';
  const rows = ready ? visibleRows(report.wiersze, $('only').checked) : [];
  $('summary').textContent = `Operacji wejściowych: ${report.liczbaOperacji}. Widocznych wierszy: ${rows.length}.`;
  $('empty').hidden = !ready || rows.length > 0;
  for (const row of rows) {
    const tr = document.createElement('tr');
    for (const value of [row.id, row.nrRachunku, money(row.kwotaGrosze,row.waluta), money(row.wykorzystanieGrosze,row.waluta), money(row.limitGrosze,row.waluta), money(row.przekroczenieGrosze,row.waluta), labels[row.status]]) {
      const td = document.createElement('td'); td.textContent = value; tr.append(td);
    }
    const td = document.createElement('td'), button = document.createElement('button');
    button.textContent = 'Pokaż'; button.setAttribute('aria-label', `Szczegóły ${row.id}`);
    button.addEventListener('click', () => {
      $('details').hidden = false;
      $('detail-text').textContent = `${row.id}, data waluty ${row.dataWaluty}. ${row.powod} Wykorzystanie: ${money(row.wykorzystanieGrosze,row.waluta)}.`;
    });
    td.append(button); tr.append(td); $('rows').append(tr);
  }
}
function validate(value) {
  if (!value || !['gotowe','niepodlaczone'].includes(value.stan) || !Number.isInteger(value.liczbaOperacji) || value.liczbaOperacji < 0 || !Array.isArray(value.wiersze)) throw new Error('Niepoprawny kontrakt raportu');
  for (const row of value.wiersze) {
    if (!['PLN','EUR','USD'].includes(row.waluta) || !Object.hasOwn(labels, row.status)) throw new Error('Nieznana waluta lub status');
    for (const key of ['id','nrRachunku','dataWaluty','powod']) if(typeof row[key] !== 'string') throw new Error(`Brak pola ${key}`);
    for (const key of ['kwotaGrosze','wykorzystanieGrosze','przekroczenieGrosze']) if(!Number.isSafeInteger(row[key]) || row[key]<0) throw new Error(`Niepoprawne grosze: ${key}`);
    if(row.limitGrosze !== null && (!Number.isSafeInteger(row.limitGrosze) || row.limitGrosze<0)) throw new Error('Niepoprawny limit');
  }
  return value;
}
function failure(error) {
  report = undefined; $('rows').replaceChildren(); $('details').hidden = true; $('empty').hidden = true;
  $('summary').textContent = ''; $('mode').textContent = `Nie udało się odczytać raportu: ${error.message}`;
}
async function load() {
  $('upload').hidden = $('source').value !== 'plik';
  if ($('source').value === 'plik') { $('upload').value = ''; failure(new Error('wybierz lokalny plik JSON')); return; }
  try { const response = await fetch(`/api/${$('source').value}`); if(!response.ok) throw new Error(`HTTP ${response.status}`); report = validate(await response.json()); render(); } catch(error) { failure(error); }
}
$('only').addEventListener('change', () => { if(report) render(); });
$('source').addEventListener('change', load); $('refresh').addEventListener('click', load);
$('upload').addEventListener('change', async () => { try { const file=$('upload').files[0]; if(!file)return; report=validate(JSON.parse(await file.text())); report.tryb='plik'; report.zrodlo=file.name; render(); } catch(error){failure(error);} });
load();
