import nodemailer from 'nodemailer'
export const generatePassword = (documento) => `CP${documento.toString().slice(-3)}`
export const generateUsername = (documento) => `CP${documento.toString()}`

export function separarNombre(nombre) {
  const nombres = nombre.split(' ', 4)

  let nombre1, nombre2, apellido1, apellido2

  switch (nombres.length) {
    case 2:
      nombre1 = nombres[0]
      nombre2 = ''
      apellido1 = nombres[1]
      apellido2 = ''
      break
    case 3:
      nombre1 = nombres[0]
      nombre2 = nombres[1]
      apellido1 = nombres[2]
      apellido2 = ''
      break
    case 4:
      nombre1 = nombres[0]
      nombre2 = nombres[1]
      apellido1 = nombres[2]
      apellido2 = nombres[3]
      break
    default:
      console.log('Nombre no válido')
      break
  }
  return { nombre1, nombre2, apellido1, apellido2 }
}

export function obtenerFechaActual() {
  const fecha = new Date()
  const dia = String(fecha.getDate()).padStart(2, '0')
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const ano = fecha.getFullYear().toString().substr(-2)
  const hora = String(fecha.getHours()).padStart(2, '0')
  const minutos = String(fecha.getMinutes()).padStart(2, '0')
  return { dia, mes, ano, hora, minutos }
}

export async function sendEmailReport(NewMov, company) {
  let emailSend
  if (company === 'Multired'){
    emailSend = `${process.env.EMAIL_AUX_ADMIN_MUL}, ${process.env.EMAIL_COOR_SOP_MUL}, ${process.env.EMAIL_JEFE_TEC}`
  } else if (company === 'Servired'){
    emailSend = `${process.env.EMAIL_AUX_ADMIN_SER}, ${process.env.EMAIL_COOR_SOP_SER}, ${process.env.EMAIL_JEFE_TEC}`
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailSend,
      subject: 'Nuevo Movimiento Realizado',
      html: htmlCreatedUser(NewMov)
    }
  
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.log(error);
  }

}

export function htmlCreatedUser(movimiento) {
  const { items, bodegaOrigen, bodegaDestino, incidente, descripcion, encargado } = movimiento
  const Fecha = obtenerFechaActual()

  return (
    `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Información de Usuario Creada</title>
    
      <style>
        main {
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 10px;
          height: 100vh;
          background-color: #f5f5f5;
        }
    
        table {
          border-collapse: collapse;
          width: 70%;
          margin-bottom: 20px;
        }
    
        th,
        td {
          border: 1px solid #131313;
          padding: 8px;
          text-align: left;
          background-color: #c9c5c58a;
          /* color de fondo para las celdas */
        }
    
        th {
          background-color: #0f4fe5c1;
          text-align: center;
          color: #fafafa;
        }
    
        section {
          display: flex;
          justify-content: space-around;
          gap: 10px;
        }
    
        section div {
          width: 35%;
          padding: 10px;
          border: 1px solid #1d1d1d;
          text-align: center;
          border-radius: 10px;
          background-color: #fff;
        }
    
        section article {
          width: 70%;
          padding: 10px;
          border: 1px solid #151515;
          text-align: center;
          border-radius: 10px;
          margin-bottom: 10px;
        }
    
        section div p {
          margin-bottom: 10px;
        }
    
        span {
          font-weight: bold;
        }
      </style>
    
    </head>
    
    <body>
      <main>
    
        <section>
          <article>
            <p> N° Incidente: <span>${incidente} </span></p>
            <p>Encargado: <span>${encargado}</span> </p>
            <p>Descripción: <span> ${descripcion}</span></p>
            <p>Fecha: <span>${Fecha.dia}/${Fecha.mes}/${Fecha.ano} - ${Fecha.hora}:${Fecha.minutos}</span></p>
          </article>
        </section>
    
        <h2> Items que ingresan a ${bodegaDestino.nombre} </h2>
        <table>
          <tr>
            <th>Nombre</th>
            <th>Placa</th>
            <th>Serial</th>
          </tr>
          ${items.entran.map((item) => (`
           <tr>
            <td>${item.nombre}</td>
            <td>${item.placa}</td>
            <td>${item.serial}</td>
          </tr> `)).join('')}
  
        </table>

        <h2> Items que ingresan a ${bodegaOrigen.nombre} </h2>
        <table>
          <tr>
            <th>Nombre</th>
            <th>Placa</th>
            <th>Serial</th>
          </tr>
    
          ${items.salen.map((item) => (`
          <tr>
            <td>${item.nombre}</td>
            <td>${item.placa}</td>
            <td>${item.serial}</td>
          </tr> `)).join('')}
        </table>
    
        <section>
          <div>
            <h4>Bodega Origen</h4>
            <p>Sucursal: ${bodegaOrigen.sucursal}</p>
            <p>Nombre: ${bodegaOrigen.nombre}</p>
            <p>Dirección: ${bodegaOrigen.direccion}</p>
          </div>
    
          <div>
            <h4>Bodega Destino</h4>
            <p>Sucursal: ${bodegaDestino.sucursal}</p>
            <p>Nombre: ${bodegaDestino.nombre}</p>
            <p>Dirección: ${bodegaDestino.direccion}</p>
          </div>
        </section>
    
      </main>
    </body>
    
    </html>
    `
  )
}
