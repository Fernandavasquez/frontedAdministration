'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, Eye, EyeOff, LockKeyhole, UserRound } from 'lucide-react'

export default function Page() {
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }
  // En el componente LoginForm
  return (
    <main className="login-shell">
      <div className="ambient-glow ambient-glow-one" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-two" aria-hidden="true" />

      <section className="login-layout" aria-labelledby="login-title">
        <div className="brand-panel">
          <div className="brand-mark" aria-hidden="true">M</div>
          <p className="eyebrow">MARFIL / TU ESPACIO DE TRABAJO</p>
          <div className="status-line"><span className="status-dot" /> Sistema operativo <span className="status-divider" /> 2026</div>
        </div>

        <div className="login-card">
          <div className="card-heading">
            <div className="card-icon"><LockKeyhole aria-hidden="true" /></div>
            <p className="eyebrow">Acceso seguro</p>
            <h2 id="login-title">Bienvenido de nuevo</h2>
            <p>Ingresa tus datos para continuar a tu espacio.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="field-label" htmlFor="username">Usuario</label>
            <div className="input-wrap">
              <UserRound aria-hidden="true" />
              <input id="username" name="username" type="text" autoComplete="username" placeholder="tu.usuario" required />
            </div>

            <div className="field-row">
              <label className="field-label" htmlFor="password">Contraseña</label>
            </div>
            <div className="input-wrap">
              <LockKeyhole aria-hidden="true" />
              <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="••••••••" required />
              <button type="button" className="visibility-button" aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} onClick={() => setShowPassword((value) => !value)}>
                {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
              </button>
            </div>
            <button className="submit-button" type="submit">Iniciar sesión <ArrowRight aria-hidden="true" /></button>
            {submitted && <p className="demo-note" role="status">La interfaz está lista. Conecta un proveedor de autenticación para validar tus credenciales.</p>}
          </form>
        </div>
      </section>
      <p className="legal-copy">Al continuar, aceptas nuestros términos de uso y política de privacidad.</p>
    </main>
  )
}
