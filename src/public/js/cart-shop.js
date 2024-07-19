var check = false;

function changeVal(el) {
  var qt = parseInt(el.parent().children(".qt").html());
  var price = parseFloat(el.parent().children(".price").html());
  var eq = Math.round(price * qt * 1) / 1;
  
  el.parent().children(".full-price").html( "$" + eq);
  
  var shipping = parseFloat($(".shipping span").html());
  var fullPrice = Math.round((eq + shipping));
  console.log(fullPrice);
  
  
  
  $(".subtotal span").html(eq);
  // $(".tax span").html(tax);
  $(".total span").html(fullPrice);
}



function changeTotal() {
  console.log("ejecutando...");
  
}

$(document).ready(function(){
  
  $(".remove").click(function(){
    var el = $(this);
    el.parent().parent().addClass("removed");
    window.setTimeout(
      function(){
        el.parent().parent().slideUp('fast', function() { 
          el.parent().parent().remove(); 
          if($(".product").length == 0) {
            if(check) {
              $("#cart").html("");
            } else {
              $("#cart").html("<h1>No products!</h1>");
            }
          }
          changeTotal(); 
        });
      }, 200);
  });
  
  $(".qt-plus").click(function(){
    $(this).parent().children(".qt").html(parseInt($(this).parent().children(".qt").html()) + 1);
    
    $(this).parent().children(".full-price").addClass("added");
    
    var el = $(this);
    window.setTimeout(function(){el.parent().children(".full-price").removeClass("added"); changeVal(el);}, 150);
  });
  
  $(".qt-minus").click(function(){
    
    child = $(this).parent().children(".qt");
    
    if(parseInt(child.html()) > 1) {
      child.html(parseInt(child.html()) - 1);
    }
    
    $(this).parent().children(".full-price").addClass("minused");
    
    var el = $(this);
    window.setTimeout(function(){el.parent().children(".full-price").removeClass("minused"); changeVal(el);}, 150);
  });
  
  window.setTimeout(function(){$(".is-open").removeClass("is-open")}, 1200);
  
  $(".btn").click(function(){
    check = true;
    $(".remove").click();
  });
});

document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('pagar-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Evita la navegación predeterminada

    // Capturar los datos
    const subtotal = document.querySelector('.subtotal span').innerText;

    const totales = parseFloat(subtotal.replace('$', '').trim()) + 100;
    const total = totales.toFixed(2); // Asegura dos decimales

    // Crear un formulario oculto para enviar los datos
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/pagoform';

    // Añadir campos ocultos con los datos
    form.innerHTML = `
      <input type="hidden" name="subtotal" value="${subtotal}">
      <input type="hidden" name="total" value="${total}">
    `;

    document.body.appendChild(form);
    form.submit();
  });
});

document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('pagaar-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Evita la navegación predeterminada

    // Capturar los datos
    const subtotal = document.querySelector('.subtotal span').innerText;
    const totales = parseFloat(subtotal.replace('$', '').trim()) + 100;
    const total = totales.toFixed(2); // Asegura dos decimales

    // Crear un formulario oculto para enviar los datos
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/pagof';

    // Añadir campos ocultos con los datos
    form.innerHTML = `
      <input type="hidden" name="monto_pe" value="${total}">
    `;

    document.body.appendChild(form);
    form.submit();
  });
});