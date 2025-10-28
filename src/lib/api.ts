export type Ticket = {
  id: string
  title: string
  status: 'open' | 'in_progress' | 'closed'
  description?: string
  priority?: string
  createdAt: string
}

const STORAGE_KEY = 'ticketapp_tickets_v1'

function sleep(ms = 250) { return new Promise((r) => setTimeout(r, ms)) }

function validateTicketPayload(payload: any) {
  if (!payload.title || !payload.status) throw new Error('Validation: title and status are required')
  if (!['open', 'in_progress', 'closed'].includes(payload.status)) throw new Error('Validation: invalid status')
  if (payload.description && payload.description.length > 1000) throw new Error('Validation: description too long')
}

export const api = {
  async list(): Promise<Ticket[]> {
    await sleep()
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as Ticket[]
  },
  async create(payload: any): Promise<Ticket> {
    await sleep()
    validateTicketPayload(payload)
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const ticket: Ticket = { ...payload, id: Date.now().toString(), createdAt: new Date().toISOString() }
    list.unshift(ticket)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    return ticket
  },
  async update(id: string, patch: any): Promise<Ticket> {
    await sleep()
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const idx = list.findIndex((t: any) => t.id === id)
    if (idx === -1) throw new Error('Ticket not found')
    const merged = { ...list[idx], ...patch }
    validateTicketPayload(merged)
    list[idx] = merged
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    return merged
  },
  async remove(id: string): Promise<boolean> {
    await sleep()
    let list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    list = list.filter((t: any) => t.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    return true
  }
}
