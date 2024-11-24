import Airtable from "./db/airtable-db";
import { Like } from "./types";

export const getLikeCount = async (id: string) => {
  const { records } = await Airtable.get<Like>("Likes");
  const filtered = records.filter((l) => l.fields.Post.some((p) => p === id));

  console.log(filtered);

  return filtered.length;
};
