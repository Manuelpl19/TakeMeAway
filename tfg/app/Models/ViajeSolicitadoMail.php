<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ViajeSolicitadoMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $viaje;

    public function __construct($user, $viaje)
    {
        $this->user  = $user;
        $this->viaje = $viaje;
    }

    public function build()
    {
        return $this
            ->subject('Tienes un nuevo viaje solicitado')
            ->markdown('emails.viaje_solicitado');
    }
}
