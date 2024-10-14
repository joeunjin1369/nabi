import { supabase } from "@/supabase/client";

const TABLE_FREE_MEALS = "freeMeals";

const insertFreeMeals = async (insertData: {
  createdAt?: string;
  freeMealDate: string;
  maxServingCount: number;
  mealId?: string;
  sponsorId?: string;
  storeId?: string;
}) => {
  const { error, data } = await supabase
    .from(TABLE_FREE_MEALS)
    .insert(insertData);
  if (error) throw new Error(error.message);

  console.log(data);
};

const getFreeMealsWithStoreData = async () => {
  const query =
    "*, storeDatas!freeMeals_storeId_fkey(*), userProfiles!freeMeals_sponsorId_fkey(*)";
  const { error, data } = await supabase.from(TABLE_FREE_MEALS).select(query);
  if (error) throw new Error(error.message);
  console.log("data");
  return data;
};

const freeMealsAPI = {
  insertFreeMeals,
  getFreeMealsWithStoreData,
};

export default freeMealsAPI;
