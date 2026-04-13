import { useState, useEffect } from 'react'

const ONBOARDING_KEY = 'calendapp-onboarding-done'

export default function OnboardingOverlay() {
  const [step, setStep] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const done = localStorage.getItem(ONBOARDING_KEY)
    if (!done) setVisible(true)
  }, [])

  const dismiss = () => {
    localStorage.setItem(ONBOARDING_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  const steps = [
    {
      icon: '👋',
      title: '¡Bienvenido a CalendApp!',
      text: 'Crea calendarios personalizados con tus propias fotos y diseños, listos para imprimir.',
    },
    {
      icon: '📅',
      title: 'Crea un proyecto',
      text: 'Desde "Mis calendarios" crea un nuevo proyecto. Cada proyecto es un calendario de 12 meses con portada y contraportada.',
    },
    {
      icon: '🖼️',
      title: 'Sube tus fotos',
      text: 'Ve a la "Biblioteca" para subir imágenes y stickers. Las podrás usar en cualquier mes.',
    },
    {
      icon: '🎨',
      title: 'Diseña cada página',
      text: 'En el editor puedes añadir imágenes, textos y stickers sobre un lienzo A4. Personaliza colores, fuentes y el grid del calendario.',
    },
    {
      icon: '📄',
      title: 'Exporta e imprime',
      text: 'Cuando termines, exporta a PDF de alta calidad y ¡listo para imprimir!',
    },
  ]

  const current = steps[step]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9990]">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="p-8 text-center">
          <span className="text-5xl block mb-4">{current.icon}</span>
          <h2 className="text-xl font-bold text-neutral-900 mb-2">{current.title}</h2>
          <p className="text-sm text-neutral-600 leading-relaxed">{current.text}</p>
        </div>

        {/* Progress dots */}
        {/* eslint-disable-next-line react/no-array-index-key */}
        <div className="flex justify-center gap-1.5 pb-4">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === step ? 'bg-primary-600' : 'bg-neutral-200'
              }`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-neutral-100 bg-neutral-50">
          <button onClick={dismiss} className="text-xs text-neutral-400 hover:text-neutral-600">
            Saltar
          </button>
          <div className="flex gap-2">
            {step > 0 && (
              <button onClick={() => setStep((s) => s - 1)} className="btn btn-secondary text-sm">
                Anterior
              </button>
            )}
            {step < steps.length - 1 ? (
              <button onClick={() => setStep((s) => s + 1)} className="btn btn-primary text-sm">
                Siguiente
              </button>
            ) : (
              <button onClick={dismiss} className="btn btn-primary text-sm">
                ¡Empezar!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
