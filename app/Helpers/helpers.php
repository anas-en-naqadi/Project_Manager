<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Stevebauman\Purify\Facades\Purify;
use Illuminate\Support\Str;
use Spatie\LaravelImageOptimizer\Facades\ImageOptimizer;


if (!function_exists('getAuhUser')) {
    function getAuthUser() {
        return Auth::check() ? Auth::user() : null;
    }
}

if(!function_exists('storeImage')){
    function storeImage($image)
{
    if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
        $image = substr($image, strpos($image, ','));
        $type = strtolower($type[1]);
        if (!in_array($type, ['jpg', 'jpeg', 'png', 'gif'])) {
            throw new Exception('invalid image type');
        }
        $image = str_replace('', '+', $image);
        $image = base64_decode($image);
    } else {
        throw new Exception('did not match data urL with image');
    }
    $dir = 'storage/company_logos/';
    $file = Str::random() . '.' . $type;
    $absolutePath = public_path($dir);
    $relativePath = $dir . $file;
    if (!File::exists($absolutePath)) {
        File::makeDirectory($absolutePath, 0755, true);
    }

    file_put_contents($relativePath, $image);
    ImageOptimizer::optimize($absolutePath);
    return $relativePath;
}

}
if(!function_exists('cleanInputs')){
    function cleanInputs(array &$array): void
{
    foreach ($array as $field => $value) {
        if (!is_array($value) && !is_uploaded_file($value)) {
            $array[$field] = Purify::clean($value);
        } else if (is_array($value)) {
            foreach ($value as $val) {
                $val = Purify::clean($val);
            }
        }
    }
}

}
