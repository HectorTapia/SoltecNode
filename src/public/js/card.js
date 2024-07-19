//   PAGOS

// document.addEventListener('DOMContentLoaded', function() {
//     var stripe = Stripe('pk_test_51OCQCXA889WcHb938A64gVVdcxNa73wfZVkZOOCD21wC3YgLmEsZulJhAVwjsO5nUfrHm5LPa3kWW93T3t5Ep63800lfkMtz5V');
  
//     // Configura Stripe.js y Elements para usar en el formulario de pago
//     var elements = stripe.elements();
//     var cardElement = elements.create('card');
//     cardElement.mount('#card-element');
  
//     var form = document.getElementById('payment-form');
//     var resultContainer = document.getElementById('payment-result');
//     var submitButton = document.getElementById('submit-button');
  
//     form.addEventListener('submit', function(event) {
//       event.preventDefault();
//       payWithCard(stripe, cardElement);
//     });
  
//     // Función para manejar el pago con tarjeta
//     async function payWithCard(stripe, cardElement) {
//       var result = await stripe.createToken(cardElement);
  
//       if (result.error) {
//         // Muestra el error en el contenedor de resultados
//         resultContainer.textContent = result.error.message;
//       } else {
//         // Envía el token al servidor para procesar el pago
//         stripeTokenHandler(result.token);
//       }
//     }
  
//     // Función para enviar el token al servidor
//     function stripeTokenHandler(token) {
//       // Puedes enviar el token al servidor aquí y procesar el pago
//       console.log(token);
//       // Por ejemplo:
//       // fetch('/procesar-pago', {
//       //   method: 'POST',
//       //   headers: {'Content-Type': 'application/json'},
//       //   body: JSON.stringify({token: token.id})
//       // })
//       // .then(response => response.json())
//       // .then(result => {
//       //   if (result.error) {
//       //     // Muestra el error en el contenedor de resultados
//       //     resultContainer.textContent = result.error;
//       //   } else {
//       //     // Muestra un mensaje de éxito en el contenedor de resultados
//       //     resultContainer.textContent = 'Pago exitoso!';
//       //   }
//       // });
//     }
//   });

document.addEventListener('DOMContentLoaded', function() {
    var stripe = Stripe('pk_test_51OCQCXA889WcHb938A64gVVdcxNa73wfZVkZOOCD21wC3YgLmEsZulJhAVwjsO5nUfrHm5LPa3kWW93T3t5Ep63800lfkMtz5V');
    var elements = stripe.elements();
    var cardElement = elements.create('cardNumber', {
        style: {
          base: {
            color: '#777',
            fontSize: '15px',            
          },
          invalid: {
            iconColor: '#e6a7a7',
            color: '#e22929',
          },
        },
      });
    cardElement.mount('#card-element');

    var cardElementu = elements.create('cardExpiry', {
        style: {
          base: {
            color: '#777',
            fontSize: '15px',            
          },
          invalid: {
            iconColor: '#e6a7a7',
            color: '#e22929',
          },
        },
      });
    cardElementu.mount('#card-element-ex');

    var cardElementc = elements.create('cardCvc', {
        style: {
          base: {
            color: '#777',
            fontSize: '15px',            
          },
          invalid: {
            iconColor: '#e6a7a7',
            color: '#e22929',
          },
        },
      });
    cardElementc.mount('#card-element-cv');

    var form = document.getElementById('payment-form');
    var resultContainer = document.getElementById('payment-result');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log("entro al js");
        payWithCard(stripe, cardElement);
    });

    async function payWithCard(stripe, cardElement) {
        var result = await stripe.createToken(cardElement);
        if (result.error) {
            resultContainer.textContent = result.error.message;
        } else {
            stripeTokenHandler(result.token);
            
        }
    }

    function stripeTokenHandler(token) {
        console.log(token);
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const direccion = document.getElementById('direccion').value;
    const pais = document.getElementById('pais').value;
    const estado = document.getElementById('estado').value;
    const codigoPostal = document.getElementById('codigoPostal').value;
    const nombreTarjeta = document.getElementById('nombreTarjeta').value;
          // Configurar la solicitud HTTP
    fetch('/save-token', {  
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        nombre: nombre,
        correo: correo,
        direccion: direccion,
        pais: pais,
        estado: estado,
        codigoPostal: codigoPostal,
        nombreTarjeta: nombreTarjeta,
        token: token.card.last4
      })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Error al guardar el token.');
      }
      return response.json();
  })
  .then(responseData => {
      // Manejar la respuesta del servidor (por ejemplo, mostrar un mensaje al usuario)
      console.log(responseData);
  })
  .catch(error => {
      console.error('Error:', error);
  });
}
});