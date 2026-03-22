import { z } from 'zod';

export const actionSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  objective: z.string(),
  targetAudience: z.string(),
  frequency: z.enum(['WEEKLY', 'BIWEEKLY', 'MONTHLY', 'EVERY_TWO_MONTHS', 'EVENTUAL', 'FIXED']),
  daysOfWeek: z.array(z.string()).default([]),
  time: z.string().nullable(),
  howToAccess: z.string().nullable(),
  isActive: z.boolean(),
});

export type Action = z.infer<typeof actionSchema>;