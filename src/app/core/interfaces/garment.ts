export interface Garment {
  id: number;
  name: string;
  garmentSize: string;
  color: string;
  suggestedPrice: number;  // BigDecimal lo representas como number en TS
  stock: number;
  state: string;
  registerDate: string;  // LocalDateTime recibido como string (ISO format)
}