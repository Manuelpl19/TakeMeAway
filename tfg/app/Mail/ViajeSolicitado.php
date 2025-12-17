<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Viaje;

class ViajeSolicitado extends Mailable
{
    use Queueable, SerializesModels;

    public $viaje;

    public function __construct(Viaje $viaje)
    {
        $this->viaje = $viaje;
    }

    public function build()
    {
        return $this
            ->subject("Nueva solicitud de viaje")
            ->view('emails.viaje_solicitado')
            ->with([
                'viaje' => $this->viaje,
                'user'  => $this->viaje->usuario,
                'conductor' => $this->viaje->conductor,
            ]);
    }
}
