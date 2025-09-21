<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

// Add Git to PATH for proc_open calls
putenv('PATH=' . getenv('PATH') . ';C:\\laragon\\bin\\git\\bin');

// Custom error handler to suppress specific proc_open warnings
set_error_handler(function ($severity, $message, $file, $line) {
    // Suppress proc_open warnings from Sebastian version package
    if (str_contains($message, 'proc_open(): CreateProcess failed') && 
        str_contains($file, 'sebastian/version')) {
        return true; // Suppress this specific warning
    }
    return false; // Let other errors be handled normally
}, E_WARNING);

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web([
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
