

// const data = [
//   ["1", "{{nombre_pr}}", "LAp chida", 65, 100, "png", "png", "png", "png"],
//   ["2", "LAP2", "LAp chida 2", 75, 110, "png", "png", "png", "png"],
//   ["3", "LAP3", "LAp chida 3", 85, 120, "png", "png", "png", "png"],
//   ["3", "LAP3", "LAp chida 3", 85, 120, "png", "png", "png", "png"],
//   ["3", "LAP3", "LAp chida 3", 85, 120, "png", "png", "png", "png"],
//   ["3", "LAP3", "LAp chida 3", 85, 120, "png", "png", "png", "png"],
//   ["3", "LAP3", "LAp chida 3", 85, 120, "png", "png", "png", "png"],
//   ["3", "LAP3", "LAp chida 3", 85, 120, "png", "png", "png", "png"],
//   ["3", "LAP3", "LAp chida 3", 85, 120, "png", "png", "png", "png"],
//   ["3", "LAP3", "LAp chida 3", 85, 120, "png", "png", "png", "png"],
//   ["3", "LAP3", "LAp chida 3", 85, 120, "png", "png", "png", "png"],
//   ["3", "LAP3", "LAp chida 3", 85, 120, "png", "png", "png", "png"],
//   ["3", "LAP3", "LAp chida 3", 85, 120, "png", "png", "png", "png"],
//   ["3", "LAP3", "LAp chida 3", 85, 120, "png", "png", "png", "png"],
//   ["3", "LAP3", "LAp chida 3", 85, 120, "png", "png", "png", "png"],
//   ["3", "LAP3", "LAp chida 3", 85, 120, "png", "png", "png", "png"],
//   ["3", "LAP3", "LAp chida 3", 85, 120, "png", "png", "png", "png"],
//   ["3", "LAP3", "LAp chida 3", 85, 120, "png", "png", "png", "png"],
//   ["3", "LAP3", "LAp chida 3", 85, 120, "png", "png", "png", "png"],
//   ["3", "LAP3", "LAp chida 3", 85, 120, "png", "png", "png", "png"],
//   ["3", "LAP3", "LAp chida 3", 85, 120, "png", "png", "png", "png"],
  
//   // Agrega más datos aquí
// ];

fetch('/list')
            .then(response => response.json())
            .then(productoslist => {
const grid = new gridjs.Grid({
  columns: [
    {id: 'id_pr',
    name: 'Id'},
    {id: 'nombre_pr',
    name: 'Nombre'},
    {id: 'description_pr',
    name: 'Descripcion'},
    {id: 'price_pr',
    name: 'Precio%'},
    {id: 'price_ant_pr',
    name: 'Precio'},
    {id: 'image_1_pr',
    name: 'Imagen 1'},
    {id: 'image_2_pr',
    name: 'Imagen 2'},
    {id: 'image_3_pr',
    name: 'Imagen 3'},
    {id: 'image_4_pr',
    name: 'Imagen 4'},

      {
        
          name: 'Acciones',
          formatter: (cell, row) => {
              return gridjs.html(
                   `<button class="editar" data-id="${row.cells[0].data}" data-nom="${row.cells[1].data}" data-des="${row.cells[2].data}" data-pd="${row.cells[3].data}" data-pa="${row.cells[4].data}"><i class='bx bxs-message-square-edit'></i></button>
                   <button class="eliminar" data-id="${row.cells[0].data}"><i class='bx bx-trash' ></i> </button>`
              );
          }
      }
  ],
  data: productoslist,
  style: {
      table: {
          width: '100%',
      },
      th: {
          'background-color': 'rgba(0, 0, 0, 0.1)',
          color: '#000',
          'border-bottom': '3px solid #ccc',
          'text-align': 'center',
      },
      td: {
          'text-align': 'center',
      },
  },
});

// Renderiza la tabla en el elemento HTML con el ID "grid"
grid.render(document.getElementById("grid"));

})
const modal = document.querySelector('.modal');
const modald = document.querySelector('.modald');
const closeModal = document.querySelector('.modal__close');
const closeModald = document.querySelector('.modald__close');
// Agrega eventos para los botones editar y eliminar
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('editar')) {
    console.log("yes");
    modal.classList.add('modal--show');
      const id = event.target.getAttribute('data-id');
      const nom = event.target.getAttribute('data-nom');
      const des = event.target.getAttribute('data-des');
      const pd = event.target.getAttribute('data-pd');
      const pa = event.target.getAttribute('data-pa');
      document.getElementById('idValuenom').value = nom;
      document.getElementById('idValuedes').value = des;
      document.getElementById('idValuepd').value = pd;
      document.getElementById('idValuepa').value = pa;
      document.getElementById('formedit').action = '/edit/' + id;
      // alert(`Editar el elemento con ID: ${id}`);
      closeModal.addEventListener('click', (e)=>{
            e.preventDefault();
            modal.classList.remove('modal--show');
        });
  }
  if (event.target.classList.contains('eliminar')) {
    modald.classList.add('modald--show');
      const id = event.target.getAttribute('data-id');
      console.log(id);
      // alert(`Eliminar el elemento con ID: ${id}`);
      document.getElementById('idValue').textContent = id;
      document.getElementById('formdelete').action = '/delete/' + id;
      closeModald.addEventListener('click', (e)=>{
        e.preventDefault();
        modald.classList.remove('modald--show');
    });
  }
});

// JavaScript para controlar la visibilidad de la sección
const mostrar = document.getElementById("mostrar");
const productos = document.getElementById("productos");

mostrar.addEventListener("click", function () {
    console.log("entro");
    productos.style.display = "block"; // Muestra la sección al hacer clic
});

//Ventana Modal
 const openModal = document.getElementById('modal_add');
 const modala = document.querySelector('.modala');
const closeModala = document.querySelector('.modala__close');

 openModal.addEventListener('click', (e)=>{
  
   e.preventDefault();
  modala.classList.add('modala--show');
 });

 closeModala.addEventListener('click', (e)=>{
     e.preventDefault();
     modala.classList.remove('modala--show');
 });