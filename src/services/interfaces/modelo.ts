import { Meta } from "./Bitacora";
import { Categoria } from "./categoria";
import { Marca } from "./marca";
import { DatoGeneral } from "./usuarios";

export interface Modelo extends DatoGeneral {
  stock_total:number,
  marca:Marca
  categoria:Categoria
}

export interface ModeloPaginado{
    items:Modelo[],
    meta:Meta
}