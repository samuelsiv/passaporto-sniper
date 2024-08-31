type Comune = {
    objectKey: string
    persistenceStatus: string
    id: string
    istatId: any
    denominazione: string
    codice: string
    denominazioneEstera: any
    provincia: string
    provinciaQuestura: string
    new: boolean
    deleted: boolean
  }
  
type PageInfo = {
    skipResults?: number
    maxResults: number
    totalCount?: number
}
  
 type SortInfo =  {
    sortList: SortList[]
}
  
type SortList = {
    sortDirection: number
    sortProperty: string
}
  
export interface PlaceEntry {
    objectKey: string
    persistenceStatus: string
    id: number
    cap: string
    citta: string
    codice: string
    comune: string
    descrizione: string
    indirizzo: string
    infoUtente: string
    provincia: string
    ruoloId: number
    dataPrimaDisponibilitaResidenti: string;
    abilitaAccessoAgenda: boolean
    rilasciaDA: string
    telefono: string
    orarioDisponibilita: string
    appuntamentoAnticipato: string
    customerSatisfaction: string
    email: string
    msgCalendario: string
    minutiMedioAppuntamento: number
    numeroMaxAppuntamenti: number
    cancellaAppuntamento: string
    ritiroPassaporto: string
    dizionarioAttores: string
    new: boolean
    deleted: boolean
}

export interface ElencaSediRequest {
    disponibilitaNonResidenti: boolean
    minorenne: boolean
    minorenneDodici: boolean
    comune: Comune
    pageInfo: PageInfo
    sortInfo: SortInfo
}

export interface BaseResponse  {
    userMessages: undefined;
}

export interface ElencaSediResponse extends BaseResponse {
    list: PlaceEntry[]
    pageInfo: PageInfo
}

export interface GetComuneResponse extends BaseResponse {
    elenco: Comune[]
}

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        COOKIE: string;
        COMUNE: string;
        CSRF_TOKEN: string;
      }
    }
  }