import nodemailer from "nodemailer";

const emailRecuperarPass = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, nombre, token } = datos;

  const info = await transport.sendMail({
    from: "APV - Administrador de Pacientes de Veterinaria",
    to: email,
    subject: "Reestablece tu Password",
    text: "Reestablece tu Password",
    html: `<p>Hola: ${nombre}, haz solicitado restablecer tu password.</p>
    <p>Sigue el siguiente enlace para generar uno nuevo: 
    <a href="${process.env.FRONT_URL}/olvide-password/${token}">Restablecer Password</a></p>
    
    <p>Si no reconoces esta operacion, puedes ignorar este mensaje</p>`,
  });

  console.log("Mensaje enviado: $s", info.messageId);
};

export default emailRecuperarPass;
