// pages/api/save-data.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

interface FormData {
  nombre: string;
  email: string;
}

const resend = new Resend('re_Rm3kxoac_6zNDW5Zr9kY9Xt2Tco8Poj5V');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const formData: FormData = req.body;

    try {
      console.log('Datos recibidos antes de enviar:', formData);

      // Enviar correo electrónico con los datos del formulario
      await resend.emails.send({
        from: 'onboarding@resend.dev', // Cambia a tu correo o un correo autorizado
        to: 'ines.alexanderh@gmail.com', // Cambia al correo donde deseas recibir los datos
        subject: 'Nuevo Formulario Recibido',
        html: `<p><strong>Nombre:</strong> ${formData.nombre}</p>
               <p><strong>Email:</strong> ${formData.email}</p>`,
      });

      const response = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'test-s2eo6z4k6@srv1.mail-tester.com',
        subject: 'Hola Mundo',
        html: '<h1>Hola desde Resend API</h1><p>Este es un mensaje enviado desde tu API.</p>',
      });
      //https://www.mail-tester.com/test-s2eo6z4k6&reloaded=6
      console.log('despues de enviar:');

      res.status(200).json({ message: 'Correo enviado exitosamente' });
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ message: 'Error al enviar el correo' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
