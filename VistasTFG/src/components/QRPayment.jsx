import React from 'react'
import { QRCodeSVG } from 'qrcode.react'

export default function QRPayment({ url }) {
  return (
    <div className="flex flex-col items-center my-4">
      <QRCodeSVG value={url} />
      <a
        href={url}
        className="mt-2 text-indigo-600 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Abrir enlace de pago
      </a>
    </div>
  )
}