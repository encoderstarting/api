<?php

namespace App\Services;

class QrCodeService
{
    public function getQrCodeUrl(string $url): string
    {
        return 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=' . urlencode($url);
    }
}