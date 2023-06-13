import { getRepertoires } from "../../data/repertoires";

export default defineEventHandler(async () => {
  return await getRepertoires();
});
