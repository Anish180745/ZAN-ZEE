/* ---------------- Data ---------------- */
const CATEGORIES = [
  { id:'electronic', name:'Electronic', icon:'⚡', sub:['Fans & Lighting','Wiring','Switch & Socket','Battery & Inverter','Stabilizer','Doorbell','MCB & Fuse'] },
  { id:'plumbing', name:'Plumbing', icon:'🔧', sub:['Tap Repair','Pipe Leakage','Toilet & Flush','Water Tank','Drainage'] },
  { id:'homedecor', name:'Home Decor', icon:'🛋️', sub:['Wall Art','Curtains','Lighting Decor','Furniture Styling'] },
  { id:'homeservices', name:'Home Services', icon:'🧰', sub:['Book an Expert','Appliance Cleaning','Home Cleaning','Furniture Assembly','Drilling','Bath Fittings','Mandir','Minor Assembly & Drilling'] },
  { id:'acappliances', name:'AC & Appliances', icon:'❄️', sub:['AC Service','AC Gas Refill','Fridge Repair','Washing Machine','Microwave'] },
  { id:'packers', name:'Packers & Movers', icon:'🚚', sub:['Local Shifting','Packing Only','Vehicle Loading','Storage'] },
  { id:'salon', name:'Salon at Home', icon:'💇', sub:['Haircut','Facial','Waxing','Massage'] },
  { id:'others', name:'Others', icon:'✨', sub:['Pest Control','Painting','Carpentry','General Query'] },
];

const SERVICES = [
  { cat:'electronic', name:'MCB Installation / Replacement (Safety Switch)', icon:'⚡', price:99, mrp:200, detail:'Includes inspection, safety-switch replacement and load testing.' },
  { cat:'electronic', name:'Fan Installation', icon:'🌀', price:149, mrp:249, detail:'Ceiling or wall fan mounting with wiring check.' },
  { cat:'electronic', name:'Switch & Socket Repair', icon:'🔌', price:79, mrp:149, detail:'Per point — faulty switch or socket replacement.' },
  { cat:'electronic', name:'Inverter Battery Checkup', icon:'🔋', price:129, mrp:220, detail:'Full inverter health check with water-level top-up.' },
  { cat:'plumbing', name:'Tap Leakage Fix', icon:'🚰', price:89, mrp:160, detail:'Washer replacement and joint sealing for leaking taps.' },
  { cat:'plumbing', name:'Toilet Flush Tank Repair', icon:'🚽', price:159, mrp:280, detail:'Flush mechanism repair or full replacement.' },
  { cat:'plumbing', name:'Pipe Leakage Repair', icon:'🪠', price:199, mrp:349, detail:'On-site leak diagnosis and pipe joint repair.' },
  { cat:'homeservices', name:'Deep Home Cleaning', icon:'🧹', price:499, mrp:899, detail:'Full 2BHK deep clean — kitchen, bathrooms, living areas.' },
  { cat:'homeservices', name:'Furniture Assembly', icon:'🪑', price:249, mrp:399, detail:'Flat-pack furniture assembly, per unit.' },
  { cat:'homeservices', name:'Drilling & Wall Mounting', icon:'🛠️', price:69, mrp:120, detail:'Per point drilling for frames, curtain rods, shelves.' },
  { cat:'acappliances', name:'AC Service (Split/Window)', icon:'❄️', price:499, mrp:699, detail:'Full jet-wash service with filter cleaning.' },
  { cat:'acappliances', name:'Washing Machine Repair', icon:'🧺', price:249, mrp:449, detail:'Diagnosis + repair for top or front load machines.' },
  { cat:'packers', name:'Local Home Shifting (1BHK)', icon:'🚚', price:1499, mrp:2199, detail:'Packing, loading, transport and unloading within city.' },
  { cat:'homedecor', name:'Curtain Rod Installation', icon:'🪟', price:99, mrp:180, detail:'Includes rod mounting and curtain hanging.' },
  { cat:'others', name:'General Pest Control', icon:'🐜', price:399, mrp:599, detail:'Full-home spray treatment, cockroach & ant focused.' },
];

/* ---------------- State ---------------- */
let activeCat = null;
let activeSub = null;
let cart = [];

/* ---------------- Render categories ---------------- */
const catGrid = document.getElementById('catGrid');
CATEGORIES.forEach(c=>{
  const el = document.createElement('div');
  el.className = 'cat-card plate';
  el.dataset.cat = c.id;
  el.innerHTML = `
    <div class="top-row">
      <div class="cat-icon">${c.icon}</div>
      <span class="cat-count">${c.sub.length} services</span>
    </div>
    <div>
      <h3>${c.name}</h3>
      <div class="cat-sub">${c.sub.slice(0,2).join(', ')}…</div>
    </div>`;
  el.addEventListener('click', ()=> selectCategory(c.id));
  catGrid.appendChild(el);
});

function selectCategory(id){
  activeCat = id; activeSub = null;
  document.querySelectorAll('.cat-card').forEach(c=> c.classList.toggle('active', c.dataset.cat===id));
  const cat = CATEGORIES.find(c=>c.id===id);
  const panel = document.getElementById('subcatPanel');
  const scroll = document.getElementById('subcatScroll');
  scroll.innerHTML = '';
  cat.sub.forEach(s=>{
    const chip = document.createElement('button');
    chip.className = 'chip';
    chip.type = 'button';
    chip.textContent = s;
    chip.addEventListener('click', ()=>{
      activeSub = s;
      document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
      chip.classList.add('active');
      renderServices();
    });
    scroll.appendChild(chip);
  });
  panel.classList.add('open');
  document.getElementById('svcCatLabel').textContent = cat.name.toLowerCase();
  document.getElementById('svcHeading').textContent = cat.name;
  renderServices();
  document.getElementById('services').scrollIntoView({behavior:'smooth', block:'start'});
}

/* ---------------- Render services ---------------- */
function renderServices(){
  const grid = document.getElementById('svcGrid');
  grid.innerHTML = '';
  let list = activeCat ? SERVICES.filter(s=>s.cat===activeCat) : SERVICES.slice(0,6);
  if(list.length===0) list = SERVICES.filter(s=>s.cat===activeCat);
  list.forEach((s, idx)=>{
    const off = Math.round((1 - s.price/s.mrp)*100);
    const uid = s.cat + '-' + idx + '-' + s.name.slice(0,6);
    const card = document.createElement('div');
    card.className = 'svc-card plate';
    card.innerHTML = `
      <div class="svc-top">
        <div class="svc-icon">${s.icon}</div>
        <div>
          <div class="svc-name">${s.name}</div>
          <div class="svc-cat">${s.cat}</div>
        </div>
      </div>
      <button class="view-detail" type="button">View detail <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg></button>
      <div class="svc-detail">${s.detail}</div>
      <div class="svc-bottom">
        <div class="price-tag"><b>₹${s.price}</b><s>₹${s.mrp}</s><span class="off">${off}% off</span></div>
        <div class="svc-actions">
          <button class="mini-btn contact" type="button">Contact</button>
          <button class="mini-btn add" type="button" data-uid="${uid}">Add</button>
        </div>
      </div>`;
    const vd = card.querySelector('.view-detail');
    const dt = card.querySelector('.svc-detail');
    vd.addEventListener('click', ()=>{
      vd.classList.toggle('open');
      dt.classList.toggle('open');
    });
    const contactBtn = card.querySelector('.contact');
    contactBtn.addEventListener('click', ()=> showToast('Our team will call you shortly 📞'));
    const addBtn = card.querySelector('.add');
    addBtn.addEventListener('click', ()=> addToCart(s, addBtn));
    grid.appendChild(card);
  });
}
renderServices();

/* ---------------- Cart ---------------- */
function addToCart(service, btn){
  cart.push(service);
  updateCartUI();
  btn.classList.add('added');
  btn.textContent = 'Added ✓';
  showToast(`${service.name} added to cart`);
  setTimeout(()=>{ btn.classList.remove('added'); btn.textContent = 'Add'; }, 1200);
}

function removeFromCart(index){
  cart.splice(index,1);
  updateCartUI();
}

function updateCartUI(){
  document.getElementById('cartBadge').textContent = cart.length;
  const itemsEl = document.getElementById('drawerItems');
  const totalEl = document.getElementById('drawerTotal');
  if(cart.length===0){
    itemsEl.innerHTML = '<div class="drawer-empty">Your cart is empty.<br>Add a service to get started.</div>';
  } else {
    itemsEl.innerHTML = '';
    cart.forEach((item, i)=>{
      const row = document.createElement('div');
      row.className = 'drawer-item';
      row.innerHTML = `
        <div class="info"><b>${item.name}</b><span>₹${item.price}</span></div>
        <button class="remove" aria-label="Remove">✕</button>`;
      row.querySelector('.remove').addEventListener('click', ()=> removeFromCart(i));
      itemsEl.appendChild(row);
    });
  }
  const total = cart.reduce((sum,i)=> sum + i.price, 0);
  totalEl.textContent = `₹${total}`;
}
updateCartUI();

/* ---------------- Drawer open/close ---------------- */
const drawer = document.getElementById('drawer');
const overlay = document.getElementById('overlay');
function openDrawer(){ drawer.classList.add('open'); overlay.classList.add('open'); }
function closeDrawer(){ drawer.classList.remove('open'); overlay.classList.remove('open'); }
document.getElementById('cartBtn').addEventListener('click', openDrawer);
document.getElementById('closeDrawer').addEventListener('click', closeDrawer);
overlay.addEventListener('click', closeDrawer);
document.getElementById('checkoutBtn').addEventListener('click', ()=>{
  if(cart.length===0){ showToast('Add a service before booking'); return; }
  showToast('Booking request sent! We\'ll confirm shortly.');
  cart = [];
  updateCartUI();
  closeDrawer();
});

/* ---------------- Toast ---------------- */
let toastTimer;
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.classList.remove('show'), 2600);
}

/* ---------------- Booking modal ---------------- */
const bookOverlay = document.getElementById('bookOverlay');
const bookModal = document.getElementById('bookModal');
const bookForm = document.getElementById('bookForm');
const bkService = document.getElementById('bkService');
const bkDate = document.getElementById('bkDate');

// populate service dropdown, grouped by category
CATEGORIES.forEach(cat=>{
  const catServices = SERVICES.filter(s=>s.cat===cat.id);
  if(catServices.length===0) return;
  const group = document.createElement('optgroup');
  group.label = cat.name;
  catServices.forEach(s=>{
    const opt = document.createElement('option');
    opt.value = s.name;
    opt.textContent = `${s.name} — ₹${s.price}`;
    group.appendChild(opt);
  });
  bkService.appendChild(group);
});

// don't allow picking a date in the past
const today = new Date().toISOString().split('T')[0];
if(bkDate) bkDate.min = today;

function openBookModal(prefillService){
  if(prefillService) bkService.value = prefillService;
  bookOverlay.classList.add('open');
  bookModal.classList.add('open');
  document.getElementById('bkName').focus();
}
function closeBookModal(){
  bookOverlay.classList.remove('open');
  bookModal.classList.remove('open');
}
document.getElementById('bookServiceBtn').addEventListener('click', (e)=>{
  e.preventDefault();
  openBookModal();
});
document.getElementById('closeBookModal').addEventListener('click', closeBookModal);
bookOverlay.addEventListener('click', closeBookModal);
document.addEventListener('keydown', (e)=>{
  if(e.key==='Escape') closeBookModal();
});

bookForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const data = {
    name: document.getElementById('bkName').value.trim(),
    phone: document.getElementById('bkPhone').value.trim(),
    service: bkService.value,
    date: bkDate.value,
    time: document.getElementById('bkTime').value,
    address: document.getElementById('bkAddress').value.trim(),
  };
  // TODO: replace with a real API call / form submission endpoint
  console.log('Booking request:', data);
  showToast(`Thanks ${data.name.split(' ')[0]}, we\'ll confirm your booking shortly!`);
  bookForm.reset();
  closeBookModal();
});

/* ---------------- Hero search ---------------- */
document.getElementById('heroSearch').addEventListener('submit', (e)=>{
  e.preventDefault();
  const q = document.getElementById('heroSearchInput').value.trim().toLowerCase();
  if(!q) return;
  const match = CATEGORIES.find(c=> c.name.toLowerCase().includes(q) || c.sub.some(s=>s.toLowerCase().includes(q)));
  if(match){ selectCategory(match.id); }
  else { document.getElementById('services').scrollIntoView({behavior:'smooth'}); showToast('Showing closest matches'); }
});

/* ---------------- Footer category links ---------------- */
document.querySelectorAll('[data-cat]').forEach(link=>{
  link.addEventListener('click', (e)=>{
    e.preventDefault();
    selectCategory(link.dataset.cat);
  });
});

/* init default */
selectCategory('electronic');
