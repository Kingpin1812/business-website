import { addressOneLine, business } from '../config/business'
import { services } from './services'

/**
 * Frequently asked questions — shown on the page and published as FAQPage structured data.
 * Every answer here only restates facts already on the site. Before adding new questions
 * (site visits, areas served, timelines, pricing), get the answers from the business owner.
 */
export type Faq = { question: string; answer: string }

const serviceList = services.map((s) => s.title.toLowerCase())
const servicesSentence = `${serviceList.slice(0, -1).join(', ')} and ${serviceList[serviceList.length - 1]}`

export const faqs: Faq[] = [
  {
    question: `Where is ${business.name} located?`,
    answer: `${business.name} is at ${addressOneLine}, Tamil Nadu.`,
  },
  {
    question: `What aluminium and glass work does ${business.name} do?`,
    answer: `Our service categories are ${servicesSentence}. Message us on WhatsApp to check what suits your space.`,
  },
  {
    question: 'Do you work on homes as well as offices and shops?',
    answer:
      'Yes. We offer aluminium and glass options for residential and commercial spaces, including homes, offices and shops.',
  },
  {
    question: 'How do I get a quote or make an enquiry?',
    answer: `Send a WhatsApp message to ${business.phoneDisplay}, or email ${business.email}. Tell us what you need and we will get back to you to discuss it.`,
  },
  {
    question: 'What details should I share when I enquire?',
    answer:
      'Photos of the space, approximate measurements, the type of door, window or partition you have in mind, and the location of the site help us understand your requirement quickly.',
  },
]
