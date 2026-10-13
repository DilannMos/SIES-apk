/* =====================================================
   SIES — prototipo frontend
   Lo que haces se guarda en este navegador (localStorage).
   Las funciones de IA siguen siendo de demostración.
   ===================================================== */

/* ---------- Datos de ejemplo (se usan la primera vez o al restaurar) ---------- */
const DEFAULT_SUBJECTS = [
  {name:"Programación",   icon:"💻"},
  {name:"Matemáticas",    icon:"📐"},
  {name:"Física",         icon:"⚡"},
  {name:"Desarrollo Web", icon:"🌐"}
];

const DEFAULT_MATERIALS = [
  {
    id:1, name:"Leyes de Newton.pdf", type:"📄", subject:"Física", detail:"24 páginas",
    demo:{
      puntos:[
        "Primera ley (inercia): sin fuerza neta, la velocidad no cambia.",
        "Segunda ley: la fuerza neta es igual a la masa por la aceleración (F = m·a).",
        "Tercera ley: toda acción tiene una reacción igual y opuesta, aplicada sobre cuerpos distintos.",
        "La unidad de fuerza es el newton (N): 1 N = 1 kg·m/s²."
      ],
      quiz:{q:"Un objeto de 5 kg acelera a 2 m/s². ¿Cuál es la fuerza neta que actúa sobre él?", opts:["2,5 N","7 N","10 N","25 N"], ok:2, why:"F = m·a = 5 × 2 = 10 N."}
    }
  },
  {
    id:2, name:"Clases y objetos Java.pdf", type:"💻", subject:"Programación", detail:"18 páginas",
    demo:{
      puntos:[
        "Una clase es la plantilla; un objeto es una instancia de esa clase.",
        "Los atributos guardan el estado y los métodos definen el comportamiento.",
        "El constructor inicializa el objeto cuando se crea con new.",
        "Encapsulamiento: atributos private con métodos get y set."
      ],
      quiz:{q:"¿Qué línea crea un objeto de la clase Auto?", opts:["Auto a = Auto();","Auto a = new Auto();","new Auto = a;","Auto a = class Auto();"], ok:1, why:"Se usa new seguido del constructor: Auto a = new Auto();"}
    }
  },
  {
    id:3, name:"Introducción al desarrollo web.pptx", type:"🌐", subject:"Desarrollo Web", detail:"32 diapositivas",
    demo:{
      puntos:[
        "HTML define la estructura y el contenido de la página.",
        "CSS controla la presentación: colores, tipografía y distribución.",
        "JavaScript agrega comportamiento e interactividad.",
        "El navegador interpreta los tres y muestra el resultado."
      ],
      quiz:{q:"¿Qué lenguaje define el color y el espaciado de una página?", opts:["HTML","CSS","JavaScript","SQL"], ok:1, why:"CSS se encarga de la presentación visual."}
    }
  },
  {
    id:4, name:"Derivadas e integrales.pdf", type:"📐", subject:"Matemáticas", detail:"27 páginas",
    demo:{
      puntos:[
        "La derivada mide la razón de cambio instantánea de una función.",
        "Regla de la potencia: la derivada de xⁿ es n·xⁿ⁻¹.",
        "La integral definida entre a y b es el área neta bajo la curva.",
        "El teorema fundamental del cálculo conecta derivadas e integrales."
      ],
      quiz:{q:"¿Cuál es la derivada de f(x) = 4x²?", opts:["4x","8x","8x²","2x"], ok:1, why:"Por la regla de la potencia: 4 · 2 · x = 8x."}
    }
  },
  {
    id:5, name:"Estructuras de control.docx", type:"📝", subject:"Programación", detail:"12 páginas",
    demo:{
      puntos:[
        "if / else decide qué código ejecutar según una condición.",
        "switch elige entre varios casos posibles.",
        "for repite cuando se conoce el número de vueltas.",
        "while repite mientras la condición sea verdadera."
      ],
      quiz:{q:"¿Qué estructura repite un bloque mientras se cumpla una condición?", opts:["if","switch","while","return"], ok:2, why:"while evalúa la condición antes de cada repetición."}
    }
  }
];

const card = (id, subject, materialId, topic, q, a) => ({id, subject, materialId, topic, q, a});
const DEFAULT_CARDS = [
  card(1,  "Programación", 2, "Programación · Java", "¿Qué es una clase en Java?", "Una plantilla que define atributos y comportamientos para crear objetos."),
  card(2,  "Programación", 2, "Programación · Java", "¿Qué es un objeto?", "Una instancia de una clase, con su propio estado (los valores de sus atributos)."),
  card(3,  "Programación", 2, "Programación · Java", "¿Para qué sirve un constructor?", "Para inicializar un objeto cuando se crea con new. Tiene el mismo nombre que la clase y no declara tipo de retorno."),
  card(4,  "Programación", 2, "Programación · Java", "¿Qué diferencia hay entre un atributo y un método?", "El atributo guarda un dato (estado); el método define una acción (comportamiento)."),
  card(5,  "Matemáticas", 4, "Matemáticas · Cálculo", "¿Qué mide la derivada de una función en un punto?", "La razón de cambio instantánea: la pendiente de la recta tangente en ese punto."),
  card(6,  "Matemáticas", 4, "Matemáticas · Cálculo", "¿Qué representa la integral definida de f entre a y b?", "El área neta bajo la curva de f entre a y b."),
  card(7,  "Matemáticas", 4, "Matemáticas · Cálculo", "¿Cuál es la derivada de x²?", "2x."),
  card(8,  "Física", 1, "Física · Leyes de Newton", "¿Qué establece la primera ley de Newton?", "Un cuerpo mantiene su reposo o su movimiento rectilíneo uniforme mientras no actúe una fuerza neta sobre él."),
  card(9,  "Física", 1, "Física · Leyes de Newton", "¿Qué establece la segunda ley de Newton?", "La fuerza neta es igual a la masa por la aceleración: F = m·a."),
  card(10, "Física", 1, "Física · Leyes de Newton", "¿Qué establece la tercera ley de Newton?", "Si un cuerpo ejerce una fuerza sobre otro, el segundo ejerce sobre el primero una fuerza igual y de sentido opuesto."),
  card(11, "Desarrollo Web", 3, "Desarrollo Web · Fundamentos", "¿Para qué sirve HTML?", "Para definir la estructura y el contenido de una página web."),
  card(12, "Desarrollo Web", 3, "Desarrollo Web · Fundamentos", "¿Qué hace CSS?", "Controla la presentación: colores, tipografía, espaciado y distribución de los elementos."),
  card(13, "Programación", 5, "Programación · Control de flujo", "¿Cuándo conviene usar for?", "Cuando se sabe de antemano cuántas veces se debe repetir un bloque."),
  card(14, "Programación", 5, "Programación · Control de flujo", "¿Qué pasa si la condición de un while nunca es falsa?", "Se crea un bucle infinito.")
];

/* ---------- Utilidades ---------- */
const $  = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const clone = o => JSON.parse(JSON.stringify(o));
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
const nextId = list => list.reduce((m, x) => Math.max(m, x.id), 0) + 1;
const normalize = s => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function escapeHTML(s){
  return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function progressBar(value, label){
  return `<div class="progress" role="progressbar" aria-label="${escapeHTML(label)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${value}"><i style="width:${value}%"></i></div>`;
}

/* Fechas en hora local, como texto AAAA-MM-DD */
function ymd(d){
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
const todayStr = () => ymd(new Date());
function addDays(str, n){
  const [y, m, d] = str.split("-").map(Number);
  return ymd(new Date(y, m - 1, d + n));
}
function formatDate(str){
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es", {day:"numeric", month:"short"});
}

let toastTimer = null;
function toast(msg){
  const t = $("#toast");
  t.textContent = msg;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.textContent = ""; }, 4000);
}

/* ---------- Guardado en el navegador ---------- */
const STORE_KEY = "sies:v1";
let storageWorks = true;

function defaultState(){
  return {v:1, subjects:clone(DEFAULT_SUBJECTS), materials:clone(DEFAULT_MATERIALS), cards:clone(DEFAULT_CARDS), srs:{}, days:[]};
}
function loadState(){
  try{
    const raw = localStorage.getItem(STORE_KEY);
    if(!raw) return null;
    const s = JSON.parse(raw);
    const ok = s && s.v === 1 && Array.isArray(s.subjects) && Array.isArray(s.materials) &&
               Array.isArray(s.cards) && Array.isArray(s.days) && s.srs && typeof s.srs === "object";
    return ok ? s : null;
  }catch(e){ return null; }
}
let state = loadState() || defaultState();

function save(){
  try{
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  }catch(e){
    if(storageWorks){
      storageWorks = false;
      toast("No se pudo guardar en este navegador: tus cambios se perderán al cerrar la página.");
    }
  }
}

/* ---------- Repaso espaciado (cajas de Leitner) ---------- */
const INTERVALS = [0, 1, 3, 7, 14];          // días hasta volver a ver la tarjeta, según su caja
const MASTERED_BOX = 3;

function cardInfo(c){
  const s = state.srs[c.id];
  return s ? {box:s.box, due:s.due, seen:true} : {box:0, due:todayStr(), seen:false};
}
const isDue = c => cardInfo(c).due <= todayStr();
const isMastered = c => { const i = cardInfo(c); return i.seen && i.box >= MASTERED_BOX; };

function applyRating(c, r){
  const cur = cardInfo(c).box;
  let box;
  if(r === 1) box = 0;                                   // No sabía: vuelve hoy
  else if(r === 2) box = Math.max(1, cur);               // Más o menos: se queda
  else if(r === 3) box = Math.min(4, Math.max(1, cur) + 1);
  else box = Math.min(4, Math.max(1, cur) + 2);
  state.srs[c.id] = {box, due:addDays(todayStr(), INTERVALS[box]), seen:true};
}
function logReviewDay(){
  const t = todayStr();
  if(!state.days.includes(t)){
    state.days.push(t);
    state.days = state.days.slice(-400);
  }
}
function currentStreak(){
  const set = new Set(state.days);
  let d = todayStr();
  if(!set.has(d)) d = addDays(d, -1);                    // la racha sigue viva hasta el final del día
  let n = 0;
  while(set.has(d)){ n++; d = addDays(d, -1); }
  return n;
}

/* ---------- Cálculos (todo sale de los mismos datos, así los números coinciden) ---------- */
const cardsFor = subj => subj === "Todas" ? state.cards : state.cards.filter(c => c.subject === subj);
const dueCards = subj => cardsFor(subj).filter(isDue);

function statsOf(list){
  const total = list.length, mastered = list.filter(isMastered).length;
  return {total, mastered, progress: total ? Math.round(mastered / total * 100) : 0};
}
const subjectStats  = s => ({...statsOf(state.cards.filter(c => c.subject === s.name)), materials: state.materials.filter(m => m.subject === s.name).length});
const materialStats = m => statsOf(state.cards.filter(c => c.materialId === m.id));
const overallStats  = () => statsOf(state.cards);

/* ---------- Pantallas: dibujar ---------- */
function materialCard(m){
  const st = materialStats(m);
  const sub = m.subject || "Sin asignar";
  const actions = [["Resumen","📝"],["Tarjetas","🧠"],["Cuestionario","❓"],["Tutor IA","🤖"]]
    .map(([kind, icon]) =>
      `<button class="mini" type="button" data-action="${kind}" data-id="${m.id}" aria-label="${kind}: ${escapeHTML(m.name)}"><span aria-hidden="true">${icon}</span> ${kind}</button>`)
    .join("") +
    `<button class="mini" type="button" data-manage="${m.id}" aria-label="Gestionar: ${escapeHTML(m.name)}"><span aria-hidden="true">⚙️</span> Gestionar</button>`;
  return `<article class="material">
    <div class="file-icon" aria-hidden="true">${m.type}</div>
    <h3>${escapeHTML(m.name)}</h3>
    <p>${escapeHTML(sub)} · ${escapeHTML(m.detail)} · ${st.total ? "Progreso " + st.progress + "%" : "Sin tarjetas aún"}</p>
    ${st.total ? progressBar(st.progress, "Progreso de " + m.name) : ""}
    <div class="material-actions">${actions}</div>
  </article>`;
}

function renderHomeMaterials(){
  $("#materialPreview").innerHTML = state.materials.length
    ? state.materials.slice(0, 3).map(materialCard).join("")
    : `<div class="empty">Todavía no tienes materiales. Sube tu primer archivo arriba.</div>`;
}

/* Biblioteca con búsqueda, filtro y orden */
const lib = {q:"", subject:"all", sort:"recent"};

function renderLibrarySelect(){
  const sel = $("#libSubject");
  sel.innerHTML = `<option value="all">Todas las materias</option>` +
    state.subjects.map(s => `<option value="s:${escapeHTML(s.name)}">${escapeHTML(s.name)}</option>`).join("") +
    `<option value="none">Sin asignar</option>`;
  const exists = [...sel.options].some(o => o.value === lib.subject);
  lib.subject = exists ? lib.subject : "all";
  sel.value = lib.subject;
}
function renderLibrary(){
  let list = state.materials.slice();
  if(lib.q) list = list.filter(m => normalize(m.name).includes(normalize(lib.q)));
  if(lib.subject === "none") list = list.filter(m => !m.subject);
  else if(lib.subject.startsWith("s:")) list = list.filter(m => m.subject === lib.subject.slice(2));
  if(lib.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name, "es"));
  else if(lib.sort === "progress"){
    const p = m => { const s = materialStats(m); return s.total ? s.progress : -1; };
    list.sort((a, b) => p(b) - p(a));
  }
  $("#libCount").textContent = state.materials.length
    ? (list.length === state.materials.length
        ? plural(list.length, "material", "materiales")
        : `${list.length} de ${plural(state.materials.length, "material", "materiales")}`)
    : "";
  $("#allMaterials").innerHTML = list.length
    ? list.map(materialCard).join("")
    : `<div class="empty">${state.materials.length ? "Ningún material coincide con tu búsqueda." : "Todavía no tienes materiales. Sube tu primer archivo desde Inicio."}</div>`;
}

function renderSubjects(){
  const cards = state.subjects.map(s => {
    const st = subjectStats(s);
    const info = `${plural(st.materials, "material", "materiales")} · ${plural(st.total, "tarjeta", "tarjetas")}` +
                 (st.total ? ` · ${st.mastered} dominadas` : "");
    return `<article class="subject-card"><span aria-hidden="true">${escapeHTML(s.icon || "📚")}</span><h3>${escapeHTML(s.name)}</h3><p>${info}</p>
      ${progressBar(st.progress, "Progreso de " + s.name)}<b>${st.progress}%</b>
      <div class="card-actions">
        <button class="mini review-btn" type="button" data-review="${escapeHTML(s.name)}" aria-label="Repasar ${escapeHTML(s.name)}"><span aria-hidden="true">🧠</span> Repasar esta materia</button>
        ${s.custom ? `<button class="mini" type="button" data-del-subject="${escapeHTML(s.name)}" aria-label="Eliminar la materia ${escapeHTML(s.name)}">Eliminar</button>` : ""}
      </div></article>`;
  }).join("");
  $("#subjectGrid").innerHTML = cards + `<button class="add-card" type="button" id="addSubject">＋ Añadir materia</button>`;
}

function renderProgress(){
  const all = overallStats();
  $("#overallCircle").style.setProperty("--p", all.progress);
  $("#overallValue").textContent = all.progress + "%";
  $("#progressSummary").textContent = all.total
    ? `${all.mastered} de ${all.total} tarjetas dominadas`
    : "Aún no tienes tarjetas. Crea la primera desde Repasar.";
  $("#progressList").innerHTML = state.subjects.map(s => {
    const st = subjectStats(s);
    return `<div><span>${escapeHTML(s.name)}</span><b>${st.progress}%</b>${progressBar(st.progress, "Progreso de " + s.name)}</div>`;
  }).join("");
}

function renderStats(){
  $("#statReview").textContent = state.cards.filter(isDue).length;
  $("#statNew").textContent = state.cards.filter(c => !state.srs[c.id]).length;
  $("#statStreak").textContent = plural(currentStreak(), "día", "días");
  $("#statMastered").textContent = overallStats().progress + "%";
}

function renderFilter(){
  const options = ["Todas", ...state.subjects.map(s => s.name)];
  $("#deckFilter").innerHTML = options.map(name => {
    const n = dueCards(name).length;
    return `<button class="chip" type="button" data-subject="${escapeHTML(name)}" aria-pressed="${name === activeSubject}" aria-label="${escapeHTML(name)}, ${plural(n, "tarjeta pendiente", "tarjetas pendientes")}">${escapeHTML(name)} (${n})</button>`;
  }).join("");
}

function renderAll(){
  renderHomeMaterials();
  renderLibrarySelect();
  renderLibrary();
  renderSubjects();
  renderProgress();
  renderStats();
  renderFilter();
}

/* ---------- Navegación ---------- */
const views = ["inicio","materias","biblioteca","repasar","progreso"];
const viewAlias = {materiales:"biblioteca"};
const BASE_TITLE = "SIES — Sistema Inteligente para Estudiantes";
const viewTitles = {materias:"Materias", biblioteca:"Biblioteca", repasar:"Repasar", progreso:"Mi progreso"};

function showView(id, moveFocus){
  if(!views.includes(id)) id = "inicio";
  $$(".view").forEach(v => v.classList.toggle("active-view", v.id === "v-" + id));
  $$(".nav-link").forEach(a => {
    const on = a.dataset.view === id;
    a.classList.toggle("active", on);
    if(on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
  });
  document.title = id === "inicio" ? BASE_TITLE : `${viewTitles[id]} · SIES`;
  closeMenu();
  window.scrollTo({top:0, behavior: reduceMotion ? "auto" : "smooth"});
  if(moveFocus){
    const h = $("#v-" + id + " h1");
    if(h) h.focus({preventScroll:true});
  }
}
function goTo(id){
  if(location.hash === "#" + id) showView(id, true);
  else location.hash = id;
}
function routeFromHash(moveFocus){
  const raw = location.hash.slice(1);
  if(raw === "") return showView("inicio", moveFocus);
  const id = viewAlias[raw] || raw;
  if(views.includes(id)) showView(id, moveFocus);        // otros anclas (como #main) no cambian de pantalla
}
window.addEventListener("hashchange", () => routeFromHash(true));

/* ---------- Menú móvil ---------- */
const menuBtn = $("#menuToggle"), nav = $("#mainNav");
function closeMenu(){
  nav.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "Abrir menú");
}
function toggleMenu(){
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
}

/* ---------- Ventana emergente (modal) ---------- */
const modal = $("#materialModal"), modalContent = $("#modalContent"), closeBtn = $("#closeModal");
let lastFocus = null, modalToken = 0, currentMaterial = null, currentQuiz = null;

const modalIsOpen = () => !modal.classList.contains("hidden");
function openModal(html, focusSel){
  if(!modalIsOpen()) lastFocus = document.activeElement;
  modal.classList.remove("hidden");
  document.body.classList.add("no-scroll");
  modalContent.innerHTML = html;
  const target = focusSel && modalContent.querySelector(focusSel);
  (target || closeBtn).focus();
}
const setModal = html => { modalContent.innerHTML = html; };
function closeModal(){
  modalToken++;                                          // cancela cualquier "generando…" pendiente
  modal.classList.add("hidden");
  document.body.classList.remove("no-scroll");
  modalContent.innerHTML = "";
  if(lastFocus && lastFocus.focus) lastFocus.focus();
}
modal.addEventListener("click", e => { if(e.target === modal) closeModal(); });

document.addEventListener("keydown", e => {
  if(e.key === "Escape"){
    if(modalIsOpen()) closeModal();
    else if(nav.classList.contains("open")){ closeMenu(); menuBtn.focus(); }
    return;
  }
  if(e.key === "Enter" && e.target.id === "question"){ e.preventDefault(); answerQuestion(); return; }
  if(e.key === "Tab" && modalIsOpen()){                  // el foco se queda dentro de la ventana
    const f = [...modal.querySelectorAll("button, input, select, textarea, summary, a[href]")]
      .filter(el => !el.disabled && el.offsetParent !== null);
    if(!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  }
});

function showInfo(title, text){
  openModal(`<h2 id="modalTitle">${escapeHTML(title)}</h2><p>${escapeHTML(text)}</p>`);
}
function showConfirm(title, text, label, attrs){
  openModal(`<h2 id="modalTitle">${escapeHTML(title)}</h2><p>${escapeHTML(text)}</p>
    <div class="form-actions"><button class="primary danger" type="button" ${attrs}>${label}</button><button class="secondary" type="button" data-close>Cancelar</button></div>`, "[data-close]");
}
const formError = msg => { const el = $("#formError"); if(el) el.textContent = msg; };

/* ---------- Formularios: materia, tarjeta, material ---------- */
const ICONS = [["📚","General"],["🧪","Ciencias"],["🧬","Biología"],["🌎","Sociales"],["🗣️","Idiomas"],["🎨","Arte"],["⚖️","Derecho"],["💼","Negocios"],["🏥","Salud"]];
const RESERVED = ["todas", "sin asignar"];

function openSubjectForm(){
  openModal(`<h2 id="modalTitle">Nueva materia</h2>
    <form data-form="subject" novalidate>
      <label class="ask-label" for="f-name">Nombre</label>
      <input class="ask-input" id="f-name" name="name" maxlength="30" autocomplete="off" required>
      <label class="ask-label" for="f-icon">Icono</label>
      <select class="ask-input" id="f-icon" name="icon">${ICONS.map(([i, n]) => `<option value="${i}">${i} ${n}</option>`).join("")}</select>
      <div class="form-error" id="formError" role="alert"></div>
      <div class="form-actions"><button class="primary" type="submit">Crear materia</button><button class="secondary" type="button" data-close>Cancelar</button></div>
    </form>`, "#f-name");
}

function subjectOptions(selected, withNone){
  return (withNone ? `<option value="">Sin asignar</option>` : "") +
    state.subjects.map(s => `<option value="${escapeHTML(s.name)}"${s.name === selected ? " selected" : ""}>${escapeHTML(s.name)}</option>`).join("");
}

function openCardForm(opts = {}){
  const mat = opts.materialId ? state.materials.find(m => m.id === opts.materialId) : null;
  const subj = (mat && mat.subject) || opts.subject || (activeSubject !== "Todas" ? activeSubject : state.subjects[0].name);
  openModal(`<h2 id="modalTitle">Nueva tarjeta</h2>
    <form data-form="card" data-material="${mat ? mat.id : ""}" novalidate>
      <label class="ask-label" for="f-q">Pregunta</label>
      <textarea class="ask-input" id="f-q" name="q" rows="2" maxlength="200" required></textarea>
      <label class="ask-label" for="f-a">Respuesta</label>
      <textarea class="ask-input" id="f-a" name="a" rows="3" maxlength="400" required></textarea>
      <label class="ask-label" for="f-subject">Materia</label>
      <select class="ask-input" id="f-subject" name="subject">${subjectOptions(subj, false)}</select>
      <label class="ask-label" for="f-material">Material (opcional)</label>
      <select class="ask-input" id="f-material" name="material"></select>
      <div class="form-error" id="formError" role="alert"></div>
      <div class="form-actions">
        <button class="primary" type="submit">Guardar tarjeta</button>
        <button class="secondary" type="submit" data-again="1">Guardar y añadir otra</button>
        <button class="secondary" type="button" data-close>Cancelar</button>
      </div>
    </form>`, "#f-q");
  fillMaterialOptions(mat ? mat.id : null);
}
function fillMaterialOptions(selectedId){
  const form = $("form[data-form='card']");
  if(!form) return;
  const subject = $("#f-subject").value;
  const pre = Number(form.dataset.material) || null;
  const keep = selectedId !== undefined ? selectedId : (Number($("#f-material").value) || null);
  const list = state.materials.filter(m => m.subject === subject || m.id === pre);
  $("#f-material").innerHTML = `<option value="">Ninguno</option>` +
    list.map(m => `<option value="${m.id}"${m.id === keep ? " selected" : ""}>${escapeHTML(m.name)}</option>`).join("");
}

function openMaterialForm(id){
  const m = state.materials.find(x => x.id === id);
  if(!m) return;
  openModal(`<h2 id="modalTitle">Gestionar material</h2>
    <form data-form="material" data-id="${m.id}" novalidate>
      <label class="ask-label" for="f-mname">Nombre</label>
      <input class="ask-input" id="f-mname" name="name" maxlength="80" value="${escapeHTML(m.name)}" autocomplete="off" required>
      <label class="ask-label" for="f-msubject">Materia</label>
      <select class="ask-input" id="f-msubject" name="subject">${subjectOptions(m.subject, true)}</select>
      <div class="form-error" id="formError" role="alert"></div>
      <div class="form-actions">
        <button class="primary" type="submit">Guardar cambios</button>
        <button class="secondary danger-outline" type="button" data-delete-material="${m.id}">Eliminar material</button>
        <button class="secondary" type="button" data-close>Cancelar</button>
      </div>
    </form>`, "#f-mname");
}

function cardStatus(c){
  const i = cardInfo(c);
  if(!i.seen) return "Nueva";
  if(i.box >= MASTERED_BOX) return "Dominada";
  return i.due <= todayStr() ? "Pendiente hoy" : "Próxima: " + formatDate(i.due);
}
function openCardsManager(){
  const list = cardsFor(activeSubject);
  openModal(`<h2 id="modalTitle">Administrar tarjetas</h2>
    <p class="demo-note">${activeSubject === "Todas" ? "Todas las materias" : escapeHTML(activeSubject)} · ${plural(list.length, "tarjeta", "tarjetas")}</p>
    ${list.length ? `<ul class="manage-list">${list.map(c => `<li><div><span class="q">${escapeHTML(c.q)}</span><small>${escapeHTML(c.subject)} · ${cardStatus(c)}</small></div>
      <button class="mini" type="button" data-del-card="${c.id}" aria-label="Eliminar tarjeta: ${escapeHTML(c.q)}">Eliminar</button></li>`).join("")}</ul>` : `<p>No hay tarjetas todavía.</p>`}
    <div class="form-actions"><button class="primary" type="button" data-add-card>＋ Nueva tarjeta</button><button class="secondary" type="button" data-close>Cerrar</button></div>`);
}

document.addEventListener("submit", e => {
  const f = e.target.closest("form[data-form]");
  if(!f) return;
  e.preventDefault();
  const fd = new FormData(f);
  const kind = f.dataset.form;

  if(kind === "subject"){
    const name = String(fd.get("name") || "").trim().replace(/\s+/g, " ");
    if(!name) return formError("Escribe un nombre para la materia.");
    if(RESERVED.includes(normalize(name)) || state.subjects.some(s => normalize(s.name) === normalize(name)))
      return formError("Ya existe una materia con ese nombre.");
    state.subjects.push({name, icon:String(fd.get("icon") || "📚"), custom:true});
    save(); renderAll(); closeModal(); toast(`Materia «${name}» creada.`);
  }

  if(kind === "card"){
    const q = String(fd.get("q") || "").trim(), a = String(fd.get("a") || "").trim();
    const subject = String(fd.get("subject") || "");
    const matId = Number(fd.get("material")) || null;
    if(!q || !a) return formError("Escribe la pregunta y la respuesta.");
    if(!state.subjects.some(s => s.name === subject)) return formError("Elige una materia.");
    state.cards.push({id:nextId(state.cards), subject, materialId:matId, topic:null, q, a});
    save(); renderAll(); startSession(false, false);
    if(e.submitter && e.submitter.dataset.again){
      toast("Tarjeta guardada. Puedes añadir otra.");
      openCardForm({subject, materialId:matId});
    }else{
      closeModal(); toast(`Tarjeta añadida a ${subject}.`);
    }
  }

  if(kind === "material"){
    const m = state.materials.find(x => x.id === Number(f.dataset.id));
    const name = String(fd.get("name") || "").trim();
    if(!m) return closeModal();
    if(!name) return formError("El nombre no puede estar vacío.");
    m.name = name;
    m.subject = String(fd.get("subject") || "") || null;
    if(m.subject) state.cards.forEach(c => { if(c.materialId === m.id) c.subject = m.subject; });
    save(); renderAll(); startSession(false, false); closeModal(); toast("Cambios guardados.");
  }
});

/* ---------- Herramientas de estudio (demostración) ---------- */
function generate(kind, m){
  currentMaterial = m;
  if(kind === "Tutor IA") return openModal(buildTutor(m), "#question");
  if(kind === "Tarjetas") return openModal(buildCards(m));
  const labels = {"Resumen":"resumen", "Cuestionario":"cuestionario"};
  const token = ++modalToken;
  openModal(`<h2 id="modalTitle">Preparando ${labels[kind]}…</h2><p class="loader" role="status"><span aria-hidden="true">🤖</span> Analizando <strong>${escapeHTML(m.name)}</strong></p>`);
  setTimeout(() => { if(token === modalToken) setModal(build(kind, m)); }, 700);
}

function buildCards(m){
  const list = state.cards.filter(c => c.materialId === m.id);
  return `<h2 id="modalTitle">🧠 Tarjetas de estudio</h2><p class="demo-note">${escapeHTML(m.name)} · ${plural(list.length, "tarjeta", "tarjetas")}</p>
    ${list.length
      ? `<div class="generated">${list.map(c => `<details><summary>${escapeHTML(c.q)}</summary><p>${escapeHTML(c.a)}</p></details>`).join("")}</div><p class="demo-note">Toca una pregunta para ver la respuesta.</p>`
      : `<div class="generated">Este material todavía no tiene tarjetas. Crea las tuyas con tus propias preguntas y respuestas.</div>`}
    <div class="form-actions"><button class="primary" type="button" data-add-card data-material="${m.id}">＋ Añadir tarjeta</button><button class="secondary" type="button" data-close>Cerrar</button></div>`;
}

function build(kind, m){
  if(!m.demo) return notReady(m);
  const name = escapeHTML(m.name);
  if(kind === "Resumen"){
    return `<h2 id="modalTitle">📝 Resumen</h2><p class="demo-note">${name}</p>
      <div class="generated"><strong>Ideas clave</strong><ul>${m.demo.puntos.map(p => `<li>${escapeHTML(p)}</li>`).join("")}</ul></div>
      <p class="demo-note">Resumen de ejemplo. Con el servidor conectado se generaría a partir del contenido real del archivo.</p>`;
  }
  currentQuiz = m.demo.quiz;                              // Cuestionario
  return `<h2 id="modalTitle">❓ Cuestionario</h2><p class="demo-note">${name}</p>
    <div class="generated"><strong>${escapeHTML(currentQuiz.q)}</strong>
      ${currentQuiz.opts.map((o, i) => `<button class="quiz-opt" type="button" data-quiz="${i}">${String.fromCharCode(65 + i)}) ${escapeHTML(o)}</button>`).join("")}
      <div class="feedback" id="quizFeedback" role="status" aria-live="polite"></div>
    </div>`;
}

function notReady(m){
  return `<h2 id="modalTitle">Material recibido</h2>
    <div class="generated">Tu archivo <strong>${escapeHTML(m.name)}</strong> ya está en la biblioteca. En esta demostración solo los materiales de ejemplo tienen resumen y cuestionario; con el servidor conectado se extraería el texto de tu archivo para crearlos. Mientras tanto, en <strong>Tarjetas</strong> puedes escribir las tuyas.</div>`;
}

function buildTutor(m){
  return `<h2 id="modalTitle">🤖 Tutor IA</h2>
    <p>Haz preguntas sobre <strong>${escapeHTML(m.name)}</strong>.</p>
    <div class="generated">Ejemplo: “Explícame este tema como si fuera principiante y dame un ejemplo práctico.”</div>
    <label class="ask-label" for="question">Tu pregunta</label>
    <input class="ask-input" id="question" type="text" placeholder="Escribe tu pregunta…" autocomplete="off">
    <button class="primary" type="button" id="askBtn">Preguntar al tutor</button>
    <div id="aiAnswer" role="status" aria-live="polite"></div>`;
}
function answerQuestion(){
  const q = $("#question").value.trim();
  $("#aiAnswer").innerHTML = q
    ? `<div class="generated">Respuesta de demostración: con el servidor conectado, la IA usaría el contenido de <strong>${escapeHTML(currentMaterial.name)}</strong> para responder con claridad, indicar la parte exacta del material y avisarte si la información no está en el documento.</div>`
    : "<p>Escribe una pregunta primero.</p>";
}

/* ---------- Subida de archivos ---------- */
const ALLOWED = ["pdf","pptx","docx","jpg","jpeg","png"];
const MAX_MB = 20;
const fileIcons = {pdf:"📄", pptx:"📊", docx:"📝", jpg:"🖼️", jpeg:"🖼️", png:"🖼️"};

function formatSize(bytes){
  return bytes < 1048576
    ? Math.max(1, Math.round(bytes / 1024)) + " KB"
    : (bytes / 1048576).toFixed(1).replace(".", ",") + " MB";
}

function handleFiles(fileList){
  const files = [...fileList];
  if(!files.length) return;
  const added = [], rejected = [];
  files.forEach(f => {
    const ext = f.name.includes(".") ? f.name.split(".").pop().toLowerCase() : "";
    if(!ALLOWED.includes(ext)) rejected.push(`${f.name} (formato no admitido)`);
    else if(f.size > MAX_MB * 1048576) rejected.push(`${f.name} (pesa más de ${MAX_MB} MB)`);
    else added.push({file:f, ext});
  });
  added.reverse().forEach(({file, ext}) => state.materials.unshift({
    id:nextId(state.materials), name:file.name, type:fileIcons[ext], subject:null,
    detail:formatSize(file.size), demo:null
  }));
  if(added.length){ save(); renderAll(); }

  const status = $("#uploadStatus");
  status.textContent = "";
  if(added.length){
    const d = document.createElement("div");
    d.className = "ok";
    d.textContent = `✓ ${plural(added.length, "archivo agregado", "archivos agregados")} al inicio de tu biblioteca. Usa «Gestionar» para asignarle una materia.`;
    status.appendChild(d);
  }
  if(rejected.length){
    const d = document.createElement("div");
    d.className = "error";
    d.textContent = `No se pudo agregar: ${rejected.join("; ")}. Formatos admitidos: PDF, PPTX, DOCX, JPG y PNG.`;
    status.appendChild(d);
  }
}

$("#selectFiles").addEventListener("click", () => $("#fileInput").click());
$("#fileInput").addEventListener("change", e => { handleFiles(e.target.files); e.target.value = ""; });

const dz = $("#dropzone");
["dragenter","dragover"].forEach(ev => dz.addEventListener(ev, e => { e.preventDefault(); dz.classList.add("drag"); }));
["dragleave","drop"].forEach(ev => dz.addEventListener(ev, e => { e.preventDefault(); dz.classList.remove("drag"); }));
dz.addEventListener("drop", e => handleFiles(e.dataTransfer.files));
["dragover","drop"].forEach(ev => window.addEventListener(ev, e => e.preventDefault()));   // evita que el navegador abra el archivo

/* ---------- Biblioteca: controles ---------- */
$("#libSearch").addEventListener("input", e => { lib.q = e.target.value.trim(); renderLibrary(); });
$("#libSubject").addEventListener("change", e => { lib.subject = e.target.value; renderLibrary(); });
$("#libSort").addEventListener("change", e => { lib.sort = e.target.value; renderLibrary(); });
document.addEventListener("change", e => { if(e.target.id === "f-subject") fillMaterialOptions(); });

/* ---------- Repaso ---------- */
let activeSubject = "Todas";
let session = {queue:[], idx:0, ratings:[], requeued:new Set(), practice:false};

function showDeckState(name){
  ["deckActive", "deckDone", "deckEmpty"].forEach(id => $("#" + id).classList.toggle("hidden", id !== name));
}
function startSession(practice, moveFocus){
  const base = practice ? cardsFor(activeSubject) : dueCards(activeSubject);
  session = {queue:base.slice(), idx:0, ratings:[], requeued:new Set(), practice};
  renderCard(moveFocus);
}
function setSubject(name, moveFocus){
  activeSubject = name;
  renderFilter();
  startSession(false, moveFocus);
}

function renderCard(moveFocus){
  const label = activeSubject === "Todas" ? "tus materias" : activeSubject;
  const all = cardsFor(activeSubject);

  if(all.length === 0){
    showDeckState("deckEmpty");
    $("#deckEmptyTitle").textContent = "Aún no hay tarjetas";
    $("#deckEmptyMsg").textContent = activeSubject === "Todas"
      ? "Crea tu primera tarjeta para empezar a repasar."
      : `${activeSubject} todavía no tiene tarjetas. Crea la primera.`;
    $("#deckEmptyActions").innerHTML = `<button class="primary" type="button" data-add-card>＋ Crear tarjeta</button>`;
    if(moveFocus) $("#deckEmpty").focus();
    return;
  }
  if(session.queue.length === 0){
    const future = all.map(c => cardInfo(c).due).filter(d => d > todayStr()).sort()[0];
    showDeckState("deckEmpty");
    $("#deckEmptyTitle").textContent = "¡Estás al día!";
    $("#deckEmptyMsg").textContent = `No tienes tarjetas pendientes en ${label}.` + (future ? ` La próxima toca el ${formatDate(future)}.` : "");
    $("#deckEmptyActions").innerHTML = `<button class="primary" type="button" id="practiceBtn">Practicar de todos modos</button>`;
    if(moveFocus) $("#deckEmpty").focus();
    return;
  }
  if(session.idx >= session.queue.length){
    const last = new Map();
    session.ratings.forEach(r => last.set(r.card.id, r));
    const results = [...last.values()];
    const known = results.filter(r => r.rating >= 3).length;
    const weak = results.filter(r => r.rating <= 2);
    showDeckState("deckDone");
    $("#deckSummary").textContent = `Repasaste ${plural(results.length, "tarjeta", "tarjetas")} y marcaste ${known} como conocidas.`;
    $("#deckReinforce").innerHTML = weak.length
      ? `<strong>Para reforzar:</strong><ul>${weak.map(r => `<li>${escapeHTML(r.card.q)}</li>`).join("")}</ul>`
      : "<strong>No quedó ninguna tarjeta para reforzar. ¡Muy bien!</strong>";
    if(moveFocus) $("#deckDone").focus();
    return;
  }

  const c = session.queue[session.idx];
  const mat = c.materialId ? state.materials.find(m => m.id === c.materialId) : null;
  showDeckState("deckActive");
  $("#cardCount").textContent = `Tarjeta ${session.idx + 1} de ${session.queue.length}`;
  $("#cardTopic").textContent = c.topic || (c.subject + (mat ? " · " + mat.name : ""));
  $("#cardQuestion").textContent = c.q;
  $("#cardAnswer").textContent = c.a;
  $("#cardAnswer").classList.add("hidden");
  $("#showAnswer").classList.remove("hidden");
  $("#rating").classList.add("hidden");
  if(moveFocus) $("#showAnswer").focus();
}

function rate(r){
  const c = session.queue[session.idx];
  if(!c) return;
  applyRating(c, r);
  session.ratings.push({card:c, rating:r});
  if(r === 1 && !session.requeued.has(c.id)){            // "No sabía": vuelve a salir al final de esta sesión
    session.requeued.add(c.id);
    session.queue.push(c);
  }
  session.idx++;
  logReviewDay();
  save();
  renderAll();
  renderCard(true);
}

function deleteCard(id){
  state.cards = state.cards.filter(c => c.id !== id);
  delete state.srs[id];
  save(); renderAll(); startSession(false, false);
  openCardsManager();
}

/* ---------- Un solo manejador de clics ---------- */
document.addEventListener("click", e => {
  const t = e.target;
  const on = sel => t.closest(sel);
  let el;

  // menú móvil
  if(on("#menuToggle")) return toggleMenu();
  if(nav.classList.contains("open") && !on("#mainNav")) closeMenu();

  // navegación
  if((el = on("[data-view]"))){ e.preventDefault(); return goTo(el.dataset.view); }

  // ventanas
  if(on("#closeModal") || on("[data-close]")) return closeModal();
  if(on("#profileBtn")) return showInfo("Tu perfil", "El perfil y el inicio de sesión estarán disponibles cuando SIES se conecte a un servidor.");

  // materias
  if(on("#addSubject")) return openSubjectForm();
  if((el = on("[data-review]"))){ setSubject(el.dataset.review, false); return goTo("repasar"); }
  if((el = on("[data-del-subject]"))){
    const name = el.dataset.delSubject;
    const n = state.cards.filter(c => c.subject === name).length;
    return showConfirm(`¿Eliminar «${name}»?`,
      `Se eliminarán también sus ${plural(n, "tarjeta", "tarjetas")}. Los materiales de esta materia pasarán a «Sin asignar».`,
      "Sí, eliminar materia", `data-confirm="subject" data-name="${escapeHTML(name)}"`);
  }

  // materiales
  if((el = on("[data-action]"))){
    const m = state.materials.find(x => x.id === Number(el.dataset.id));
    return m && generate(el.dataset.action, m);
  }
  if((el = on("[data-manage]"))) return openMaterialForm(Number(el.dataset.manage));
  if((el = on("[data-delete-material]"))){
    const m = state.materials.find(x => x.id === Number(el.dataset.deleteMaterial));
    if(m) return showConfirm(`¿Eliminar «${m.name}»?`, "Sus tarjetas se conservan en la materia.", "Sí, eliminar material", `data-confirm="material" data-id="${m.id}"`);
  }

  // confirmaciones
  if((el = on("[data-confirm]"))){
    const what = el.dataset.confirm;
    if(what === "material"){
      const id = Number(el.dataset.id);
      state.materials = state.materials.filter(m => m.id !== id);
      state.cards.forEach(c => { if(c.materialId === id) c.materialId = null; });
      save(); renderAll(); startSession(false, false); closeModal(); toast("Material eliminado.");
    }else if(what === "subject"){
      const name = el.dataset.name;
      const ids = state.cards.filter(c => c.subject === name).map(c => c.id);
      ids.forEach(id => delete state.srs[id]);
      state.cards = state.cards.filter(c => c.subject !== name);
      state.materials.forEach(m => { if(m.subject === name) m.subject = null; });
      state.subjects = state.subjects.filter(s => s.name !== name);
      if(activeSubject === name) activeSubject = "Todas";
      save(); renderAll(); startSession(false, false); closeModal(); toast(`Materia «${name}» eliminada.`);
    }else if(what === "reset"){
      try{ localStorage.removeItem(STORE_KEY); }catch(err){ /* sin acceso al guardado */ }
      state = defaultState();
      activeSubject = "Todas";
      lib.q = ""; lib.subject = "all"; lib.sort = "recent";
      $("#libSearch").value = ""; $("#libSort").value = "recent";
      renderAll(); startSession(false, false); closeModal(); toast("Datos restaurados al ejemplo.");
    }
    return;
  }
  if(on("#resetData")) return showConfirm("¿Borrar tus datos?", "Se eliminarán tus materias, materiales, tarjetas y progreso, y se restaurarán los datos de ejemplo.", "Sí, borrar mis datos", `data-confirm="reset"`);

  // tarjetas
  if((el = on("[data-add-card]"))) return openCardForm({materialId: Number(el.dataset.material) || null});
  if(on("#newCardBtn")) return openCardForm();
  if(on("#manageCardsBtn")) return openCardsManager();
  if((el = on("[data-del-card]"))) return deleteCard(Number(el.dataset.delCard));

  // repaso
  if((el = on("[data-subject]"))){
    setSubject(el.dataset.subject, false);
    const chip = [...$$(".chip")].find(c => c.dataset.subject === el.dataset.subject);
    return chip && chip.focus();
  }
  if(on("#showAnswer")){
    $("#cardAnswer").classList.remove("hidden");
    $("#showAnswer").classList.add("hidden");
    $("#rating").classList.remove("hidden");
    return $("#rating button").focus();
  }
  if((el = on("[data-rating]"))) return rate(Number(el.dataset.rating));
  if(on("#restartDeck")) return startSession(false, true);
  if(on("#practiceBtn")) return startSession(true, true);

  // cuestionario y tutor
  if(on("#askBtn")) return answerQuestion();
  if((el = on("[data-quiz]")) && currentQuiz){
    const chosen = Number(el.dataset.quiz);
    $$("[data-quiz]").forEach(b => {
      const i = Number(b.dataset.quiz);
      b.disabled = true;
      if(i === currentQuiz.ok) b.classList.add("ok");
      else if(i === chosen) b.classList.add("bad");
    });
    $("#quizFeedback").textContent = (chosen === currentQuiz.ok ? "¡Correcto! " : "Todavía no. ") + currentQuiz.why;
  }
});

/* ---------- Arranque ---------- */
renderAll();
startSession(false, false);
routeFromHash(false);

/* ---------- App instalable (PWA) ---------- */
let installEvent = null;
const installBtn = $("#installBtn");
const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;

window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();                                    // guardamos el aviso para mostrarlo con nuestro botón
  installEvent = e;
  installBtn.classList.remove("hidden");
});
installBtn.addEventListener("click", async () => {
  if(!installEvent) return;
  installEvent.prompt();
  await installEvent.userChoice;
  installEvent = null;
  installBtn.classList.add("hidden");
});
window.addEventListener("appinstalled", () => {
  installBtn.classList.add("hidden");
  toast("¡SIES instalada! Búscala en tu pantalla de inicio.");
});

// iPhone/iPad no muestran botón de instalar: se explica el camino manual
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
if(isIOS && !isStandalone){
  const help = $("#installHelp");
  help.textContent = "Para instalar SIES en iPhone: toca Compartir y luego «Añadir a pantalla de inicio».";
  help.classList.remove("hidden");
}

// Modo sin conexión: solo funciona desde una dirección https:// (o localhost). Dentro del APK no hace falta: los archivos ya van incluidos
if("serviceWorker" in navigator && /^https?:$/.test(location.protocol) && !window.Capacitor){
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
