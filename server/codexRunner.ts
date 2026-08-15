import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { aiResultOutputSchema } from '../src/lib/ai/schema';
import { buildPrompt } from './prompts';
import type { Level, Mode } from '../src/types';
import { serverConfig } from './config';

const outputSchemaPath = path.join(os.tmpdir(), 'snapspeak-codex-output-schema.json');

async function ensureOutputSchemaFile() {
  await fs.writeFile(outputSchemaPath, JSON.stringify(aiResultOutputSchema, null, 2));
  return outputSchemaPath;
}

function trimPreview(text: string) {
  return text.trim().slice(0, 2000);
}

export async function generateWithCodex(imagePath: string, mode: Mode, level: Level) {
  const schemaPath = await ensureOutputSchemaFile();
  const prompt = buildPrompt(mode, level);

  return new Promise<string>((resolve, reject) => {
    const child = spawn(
      serverConfig.codexBinary,
      ['exec', '--skip-git-repo-check', '--image', imagePath, '--output-schema', schemaPath, '-'],
      {
      stdio: ['pipe', 'pipe', 'pipe'],
      cwd: process.cwd(),
      },
    );

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', (error) => {
      reject(new Error(`Failed to start codex exec: ${error.message}`));
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`codex exec failed (${code ?? 'unknown'}): ${trimPreview(stderr) || trimPreview(stdout)}`));
        return;
      }

      resolve(stdout.trim());
    });

    child.stdin.end(prompt);
  });
}
