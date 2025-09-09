// Archived copy of ElevenLabs widget injection
// @ts-check
import { defineConfig, envField } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://access.qially.com',
  base: '/support',
  integrations: [
    starlight({
      title: 'QiAlly — Support',
      description: 'How we work, expectations, billing, boundaries, and help.',
      head: [
        {
          tag: 'script',
          attrs: {
            src: 'https://unpkg.com/@elevenlabs/convai-widget-embed',
            async: true,
            type: 'text/javascript',
          },
        },
      ],
    }),
  ],
  env: {
    schema: {
      PUBLIC_ELEVENLABS_AGENT_ID: envField.string({ context: 'client', access: 'public', optional: true }),
    },
  },
});


