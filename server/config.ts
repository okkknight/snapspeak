export const serverConfig = {
  port: Number(process.env.PORT || 8787),
  codexBinary: process.env.CODEX_BINARY || 'codex',
};
