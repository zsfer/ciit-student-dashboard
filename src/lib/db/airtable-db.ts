import axios from "axios";
import { AirtableResponse } from "../types";

const airtableApi = axios.create({
  baseURL: `https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_AIRTABLE_BASE}`,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_KEY}`,
  },
});

type GetParams = {
  maxRecords: number;
  view: string;
  sort: ATSortObject[];
  filterByFormula: string;
};

const get = async <T>(
  storeName: string,
  opts?: Partial<GetParams>,
): Promise<AirtableResponse<T>> => {
  try {
    const { data } = await airtableApi.get<AirtableResponse<T>>(storeName, {
      params: opts,
    });

    return data;
  } catch (e) {
    console.error(e);
    return null!;
  }
};

const pushSingle = async <T>(
  storeName: string,
  data: T,
): Promise<AirtableResponse<T>> => {
  try {
    const { data: response } = await airtableApi.post<AirtableResponse<T>>(
      storeName,
      {
        records: [{ fields: data }],
      },
    );

    return response;
  } catch (e) {
    console.error(e);
    return null!;
  }
};

type ATSortObject = { field: string; direction: "asc" | "desc" };

const Airtable = {
  get,
  pushSingle,
};

export default Airtable;
