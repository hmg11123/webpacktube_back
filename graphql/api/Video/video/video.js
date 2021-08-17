import Video from "../../../models/Video";
import { CURRENT_TIME } from "../../../../utils/commonUtils";

export default {
 Query: {
  getAllVideo: async (_, args) => {
   const { searchValue } = args;
   try {
    const result = await Video.find({
     title: { $regex: `.*${searchValue}.*` },
    }).sort({
     createdAt: -1,
    });
   } catch (e) {
    console.log(e);
    return [];
   }
  },
 },
};
