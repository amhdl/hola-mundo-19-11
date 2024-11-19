// pages/formulario.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  nombre: string;
  email: string;
}

export default function Formulario() {
  const [formData, setFormData] = useState<FormData>({ nombre: '', email: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error al guardar datos:', error);
    }
  };

  return (
    <div>
      <h2>Formulario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo Electrónico"
          required
        />
        <button type="submit">Enviar Datos</button>
      </form>
    </div>
  );
}
