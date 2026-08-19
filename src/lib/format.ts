export function formatPrice(value: number, purpose?: 'venda' | 'arrendamento') {
  const formatted = new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)

  return purpose === 'arrendamento' ? `${formatted}/mês` : formatted
}

export function formatArea(value: number | null) {
  if (!value) return null
  return `${new Intl.NumberFormat('pt-PT').format(value)} m²`
}

export function slugify(input: string) {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-PT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}
