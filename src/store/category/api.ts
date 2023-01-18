import Fetch from '@/services/Fetch';
import {ICategoryItem} from './type';

export async function fetchListCategory(search?: string) {
  try {
    const {
      data: {totalRecords, categories},
    } = await Fetch.get<{totalRecords: number; categories: ICategoryItem[]}>(
      `@api/categories`,
      {
        params: {
          pageSize: 110,
          categoryNameTerm: search,
        },
      },
    );
    return categories;
  } catch (error: any) {
    console.log('fetchListStatistic', error);
    return [];
  }
}
