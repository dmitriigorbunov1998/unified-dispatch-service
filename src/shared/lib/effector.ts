import { createDomain } from 'effector';

export const app = createDomain('eds-manager');
export const themeDomain = app.createDomain('theme');
export const authDomain = app.createDomain('auth');
export const scriptDomain = app.createDomain('script-engine');
