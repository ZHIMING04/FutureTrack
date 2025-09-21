<?php

namespace App\Services\Ai;

use Aws\BedrockRuntime\BedrockRuntimeClient;
use Aws\Exception\AwsException;

class BedrockChatClient
{
    public function __construct(
        private ?BedrockRuntimeClient $client = null,
        private ?string $modelId = null,
        private ?string $fallbackModelId = null,
    ) {
        $this->client ??= new BedrockRuntimeClient([
            'region'  => env('AWS_REGION', 'us-east-1'),
            'version' => 'latest',
        ]);
        $this->modelId = $this->modelId ?? env('BEDROCK_MODEL_ID', 'meta.llama3-8b-instruct-v1:0');
        $this->fallbackModelId = $this->fallbackModelId ?? env('BEDROCK_FALLBACK_MODEL_ID');
    }

    public function send(array $messages): string
    {
        $cfg = [
            'maxTokens'   => (int) env('BEDROCK_MAX_TOKENS', 512),
            'temperature' => (float) env('BEDROCK_TEMPERATURE', 0.3),
            'topP'        => (float) env('BEDROCK_TOP_P', 0.9),
        ];

        try {
            return $this->callConverse($this->modelId, $messages, $cfg);
        } catch (\Throwable $e) {
            logger()->error('Bedrock Converse error', [
                'model_id' => $this->modelId,
                'region'   => env('AWS_REGION'),
                'error'    => substr($e->getMessage(), 0, 200),
            ]);
            if (!empty($this->fallbackModelId)) {
                try {
                    return $this->callConverse($this->fallbackModelId, $messages, $cfg);
                } catch (\Throwable $e2) {
                    logger()->error('Bedrock Converse fallback error', [
                        'model_id' => $this->fallbackModelId,
                        'region'   => env('AWS_REGION'),
                        'error'    => substr($e2->getMessage(), 0, 200),
                    ]);
                }
            }
            throw $e;
        }
    }

    private function callConverse(string $modelId, array $messages, array $cfg): string
    {
        $payload = [
            'modelId' => $modelId,
            'messages' => $messages,
            'inferenceConfig' => $cfg,
        ];
        $resp = $this->client->converse($payload);
        $data = $resp->toArray();

        return $data['output']['message']['content'][0]['text'] ?? '';
    }
}
