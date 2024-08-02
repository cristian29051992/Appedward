export interface Produccion {
    id: number;
    fecha: Date;
    id_producto: number;
    nombre_producto: string; // Campo nuevo
    cantidad_kg: number;
    valor_total: number;
}
