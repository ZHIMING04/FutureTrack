<?php
require_once 'vendor/autoload.php';

$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$svc = app(\App\Services\Ai\MentorService::class);
$ref = (new \ReflectionClass($svc))->getMethod('specs');
$ref->setAccessible(true);
$specs = $ref->invoke($svc);

echo 'specs-count=' . count($specs) . PHP_EOL;
echo 'has-requirements_for_course=' . (array_key_exists('requirements_for_course', $specs) ? 'yes' : 'no') . PHP_EOL;
echo 'keys=' . implode(', ', array_keys($specs)) . PHP_EOL;
