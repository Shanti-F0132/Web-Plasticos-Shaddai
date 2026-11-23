const HOJAS = {
  "bolsas-1": "img/bolsas-1.jpg",
  "bolsas-2": "img/bolsas-2.jpg",
  "precortes-1": "img/precortes-1.jpg",
  "precortes-2": "img/precortes-2.jpg",
  rollos: "img/rollos.jpg",
  guantes: "img/guantes.jpg",
  aseo: "img/aseo.jpg",
  empaque: "img/empaque.jpg",
  dotacion: "img/dotacion.jpg",
};
const CATS = [
  {
    id: "bolsas",
    n: "Bolsas",
    h: "bolsas-1",
    d: "Bolsas bajas, de basura, de manija, al vacío y más.",
  },
  {
    id: "precortes",
    n: "Precortes",
    h: "precortes-1",
    d: "Rollos de bolsa en todas las medidas y colores.",
  },
  { id: "rollos", n: "Rollos y películas", h: "rollos", d: "Vinipel, stretch y papel aluminio." },
  {
    id: "guantes",
    n: "Guantes",
    h: "guantes",
    d: "Nitrilo, látex, vinilo, industriales y domésticos.",
  },
  { id: "aseo", n: "Aseo y cafetería", h: "aseo", d: "Toallas, dispensadores, esponjillas y más." },
  {
    id: "empaque",
    n: "Empaque y amarre",
    h: "empaque",
    d: "Zuncho, cabuya, bornuja y cartón corrugado.",
  },
  { id: "dotacion", n: "Dotación", h: "dotacion", d: "Batas, cofias, polainas y delantales." },
];
const PRODUCTOS = [
  ["Bolsa baja original y lechosa", "bolsas", "bolsas-1"],
  ["Bolsa capuchón", "bolsas", "bolsas-1"],
  ["Cubre vestido, cubre pantalón y cubrelecho", "bolsas", "bolsas-1"],
  ["Bolsa de basura negra", "bolsas", "bolsas-2"],
  ["Bolsa de basura colores", "bolsas", "bolsas-2"],
  ["Bolsa de manija negra / blanca / colores", "bolsas", "bolsas-2"],
  ["Empaque al vacío", "bolsas", "bolsas-2"],
  ["Cierre hermético", "bolsas", "bolsas-2"],
  ["Bolsa transparente de alta", "precortes", "precortes-1"],
  ["Bolsa aguapanelo", "precortes", "precortes-1"],
  ["Bolsa lechosa, todas las medidas", "precortes", "precortes-2"],
  ["Bolsa negra", "precortes", "precortes-2"],
  ["Bolsa de colores", "precortes", "precortes-2"],
  ["Bolsa baja original", "precortes", "precortes-2"],
  ["Vinipel alimentos", "rollos", "rollos"],
  ["Strech colores", "rollos", "rollos"],
  ["Papel aluminio", "rollos", "rollos"],
  ["Guantes de manipulación", "guantes", "guantes"],
  ["Guantes domésticos", "guantes", "guantes"],
  ["Guantes industriales", "guantes", "guantes"],
  ["Guantes de nitrilo", "guantes", "guantes"],
  ["Guantes de vinilo", "guantes", "guantes"],
  ["Guantes de látex", "guantes", "guantes"],
  ["Tapabocas", "aseo", "aseo"],
  ["Esponjillas", "aseo", "aseo"],
  ["Toalla de mano en rollo", "aseo", "aseo"],
  ["Mallas", "aseo", "aseo"],
  ["Wypall", "aseo", "aseo"],
  ["Toalla de mano en Z", "aseo", "aseo"],
  ["Dispensador de toallas", "aseo", "aseo"],
  ["Dispensador de papel", "aseo", "aseo"],
  ["Zuncho", "empaque", "empaque"],
  ["Grapas", "empaque", "empaque"],
  ["Ganchos", "empaque", "empaque"],
  ["Cabuya", "empaque", "empaque"],
  ["Plástico bornuja", "empaque", "empaque"],
  ["Cartón corrugado", "empaque", "empaque"],
  ["Lona payaso", "dotacion", "dotacion"],
  ["Delantal plástico", "dotacion", "dotacion"],
  ["Bata quirúrgico", "dotacion", "dotacion"],
  ["Kit de estética", "dotacion", "dotacion"],
  ["Polainas", "dotacion", "dotacion"],
  ["Cofias", "dotacion", "dotacion"],
];
const $ = (s) => document.querySelector(s);
const catN = (id) => CATS.find((c) => c.id === id).n;
$("#lb").onclick = (e) => e.currentTarget.classList.remove("on");
$("#burger").onclick = () => $("nav").classList.toggle("on");
const f = $("#buscar");
if ($("#carr")) {
  f.onsubmit = (e) => {
    e.preventDefault();
    location.href = "catalogo.html?q=" + encodeURIComponent($("#q").value);
  };
  const sl = [
    {
      t: "Variedad en plásticos y más",
      p: "Bolsas, precortes, guantes, empaques y dotación para tu negocio.",
      h: "bolsas-1",
    },
    ...CATS.slice(1).map((c) => ({ t: c.n, p: c.d, h: c.h })),
  ];
  let i = 0;
  const show = () => {
    const s = sl[i];
    $("#carr .txt").innerHTML =
      `<h2>${s.t}</h2><p>${s.p}</p><a class="btn" href="catalogo.html">Ver catálogo</a>`;
    $("#carr img").src = HOJAS[s.h];
  };
  const go = (d) => {
    i = (i + d + sl.length) % sl.length;
    show();
  };
  $("#prev").onclick = () => go(-1);
  $("#next").onclick = () => go(1);
  show();
  setInterval(() => go(1), 5000);
  $("#cats").innerHTML = CATS.map(
    (c) =>
      `<a class="card" href="catalogo.html?cat=${c.id}"><img src="${HOJAS[c.h]}" alt="${c.n}"><h3>${c.n}</h3></a>`,
  ).join("");
}
if ($("#prods")) {
  const p = new URLSearchParams(location.search);
  let cat = p.get("cat") || "todos",
    q = p.get("q") || "";
  $("#q").value = q;
  const norm = (s) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const draw = () => {
    $("#tabs").innerHTML = [{ id: "todos", n: "Todos" }, ...CATS]
      .map((c) => `<button class="${c.id === cat ? "on" : ""}" data-c="${c.id}">${c.n}</button>`)
      .join("");
    const r = PRODUCTOS.filter(
      (x) => (cat === "todos" || x[1] === cat) && norm(x[0]).includes(norm(q)),
    );
    $("#prods").innerHTML =
      r
        .map(
          (x) =>
            `<button class="card p" data-h="${x[2]}"><h3>${x[0]}</h3><small>${catN(x[1])} · Ver en el catálogo</small></button>`,
        )
        .join("") || "<p>No encontramos productos con esa búsqueda.</p>";
  };
  $("#tabs").onclick = (e) => {
    if (e.target.dataset.c) {
      cat = e.target.dataset.c;
      draw();
    }
  };
  $("#prods").onclick = (e) => {
    const b = e.target.closest(".card");
    if (b) {
      $("#lb img").src = HOJAS[b.dataset.h];
      $("#lb").classList.add("on");
    }
  };
  $("#q").oninput = (e) => {
    q = e.target.value;
    draw();
  };
  f.onsubmit = (e) => e.preventDefault();
  draw();
}