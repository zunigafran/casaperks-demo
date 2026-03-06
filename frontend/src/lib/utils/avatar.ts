// frontend/src/lib/utils.ts
import { type Resident } from '@/api';

export function getAvatarUrl(resident: Resident): string {
  return resident.avatarUrl 
    ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(resident.name)}&size=128&background=F5A623&color=0F0E17`;
}