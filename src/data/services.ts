import type { LucideIcon } from 'lucide-react'
import { DoorOpen, AppWindow, DoorClosed, PanelsTopLeft, Store, Ruler } from 'lucide-react'

/**
 * Editable service categories (also published in the structured data).
 * Confirm these with the business before publishing — remove any it does not offer.
 */
export type Service = {
  title: string
  description: string
  icon: LucideIcon
}

export const services: Service[] = [
  {
    title: 'Aluminium Doors',
    description:
      'Aluminium-framed doors for homes, offices and shops in Coimbatore. Share where the door will go and roughly how big the opening is, and we will talk through suitable frame and glass options.',
    icon: DoorOpen,
  },
  {
    title: 'Aluminium Windows',
    description:
      'Clean-lined aluminium windows that bring light and ventilation into bedrooms, kitchens, offices and shops. Send photos of the openings to start the conversation.',
    icon: AppWindow,
  },
  {
    title: 'Glass Doors',
    description:
      'Modern glass doors with slim aluminium frames and long pull handles for a bright, open entrance at home, at the office or at a shopfront.',
    icon: DoorClosed,
  },
  {
    title: 'Glass Partitions',
    description:
      'Glass partitions that divide a room or an office while keeping the space open and well lit. Useful for cabins, meeting rooms and living areas.',
    icon: PanelsTopLeft,
  },
  {
    title: 'Office and Shop Glass Solutions',
    description:
      'Glass fronts, cabins and partitions for commercial spaces and storefronts. Tell us about your shop or office layout and what you want to achieve.',
    icon: Store,
  },
  {
    title: 'Custom Aluminium and Glass Works',
    description:
      'Have something specific in mind? Share your requirement, photos and measurements on WhatsApp and we will discuss what is possible for your space.',
    icon: Ruler,
  },
]
