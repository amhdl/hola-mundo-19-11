// pages/index.tsx
import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div>
      <h1>Bienvenido a nuestra Landing Page</h1>
      <Link href="/formulario">
        <button>Ir al formulario</button>
      </Link>
    </div>
  );
}
