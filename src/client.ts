import { Comune, ElencaSediRequest, ElencaSediResponse, GetComuneResponse, PlaceEntry } from './types';
import axios, { AxiosResponse } from 'axios';

const client = axios.create({
    baseURL: 'https://passaportonline.poliziadistato.it/cittadino',
    headers: {
        Accept: 'application/json, text/plain, */*',
        Cookie: process.env.COOKIE,
        'X-CSRF-TOKEN': process.env.CSRF_TOKEN,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      }
});

export async function getComune(townName: string) {
    const response = await client.post<GetComuneResponse, AxiosResponse<GetComuneResponse>>(`n/rc/v1/anagrafica/cerca-comune/${townName}`);
    if (!response.data || response.data.elenco.length <= 0)
        return null;
    
    return response.data.elenco.find(x => x.denominazione === townName);
}

export async function getAvailabilities(comune: Comune): Promise<PlaceEntry[]> {
    const response = await client.post<ElencaSediResponse, AxiosResponse<ElencaSediResponse>, ElencaSediRequest>("a/rc/v1/appuntamento/elenca-sede-prima-disponibilita", {
        comune,
        disponibilitaNonResidenti: false,
        minorenne: false,
        minorenneDodici: false,
        pageInfo: {
            maxResults: 20
        },
        sortInfo: {
            sortList: [
                {
                    sortDirection: 0,
                    sortProperty: "primaDisponibilitaResidente"
                }
            ]
        }
    });

    if (!response.data || response.data.list.length <= 0)
        return [];

    return response.data.list;
}