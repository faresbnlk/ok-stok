import { AppConfigConstants } from '../app-config-constants';
export class SearchProductRequest {
  categoryName!: string;
  subCategoryName!: string;
  field!: string;
  option!: string;
  wilaya!: string;
  onlyUsedProduct!: boolean;
  limit!: number;
  offset!: number;
}
