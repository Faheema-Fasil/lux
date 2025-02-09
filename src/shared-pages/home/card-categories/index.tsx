import React from 'react'
import CardCategoriesComponent from './card-categories'
import { fetchWithCache } from '@/server-api/config/server-fetch';
import { apiEndpoints } from '@/server-api/config/api.endpoints';

const CardCategories = async ({titles}: any) => {
    // const CardCategoriesData = await fetchCardCategoriesContentApi();
    const CardCategoriesData = await fetchWithCache(apiEndpoints.homepage.cardcategories, { authRequired: true});
    if (!CardCategoriesData) {
      console.error('CardCategoriesData is undefined');
    }
    
    
    return (
        <CardCategoriesComponent
          titles={titles}
          CardCategoriesData={CardCategoriesData}
        />
      );
}

export default CardCategories