// Facts from veon/client.json and audit/notes/site-text-uk.md. Nothing here is invented.
export const PHONE_DISPLAY = "+38 095 622 18 02";
export const PHONE_TEL = "tel:+380956221802";
export const EMAIL = "uzhdent@gmail.com";
export const ADDRESS_LINE = "вул. П. Скунця, 1";
export const ADDRESS_FULL = "88000, Ужгород, вул. П. Скунця, 1";
export const MAP_URL = "https://www.google.com/maps/search/?api=1&query=48.624393,22.287174";
export const FACEBOOK_URL = "https://www.facebook.com/uzhdentstomatologiya/";
export const INSTAGRAM_URL = "https://www.instagram.com/uzhdent/";
export const FUTURE_NOTE = "Розділ у розробці";

export type ChannelId = "phone" | "viber" | "whatsapp" | "telegram";
export interface Channel { id: ChannelId; label: string; href: string; aria: string; external: boolean; }

export const CHANNELS: readonly Channel[] = [
  { id: "phone", label: "Подзвонити", href: PHONE_TEL, aria: `Подзвонити: ${PHONE_DISPLAY}`, external: false },
  { id: "viber", label: "Viber", href: "viber://chat?number=%2B380956221802", aria: "Написати у Viber", external: false },
  { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/380956221802", aria: "Написати у WhatsApp", external: true },
  { id: "telegram", label: "Telegram", href: "https://t.me/UzhDent", aria: "Написати в Telegram", external: true },
];

export const MESSENGERS = CHANNELS.filter((c) => c.id !== "phone");

export const NAV = [
  { href: "#implants", label: "Імплантація" },
  { href: "#services", label: "Послуги" },
  { href: "#doctors", label: "Лікарі" },
  { href: "#proof", label: "Чому ми" },
  { href: "#contacts", label: "Контакти" },
] as const;
