<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AlertUsersMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $details;
    /**
     * Create a new message instance.
     */
    public function __construct($details)
    {
        $this->details = $details;
    }




    /**
     * Get the message content definition.
     */
    public function build()
    {
        return $this->from($this->details['company_name'] .'@company.com', $this->details['company_name'])
        ->view('mails.mail')
        ->with('details', $this->details)
            ->subject($this->details['subject']);
    }


}
