package com.example.api.repository;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.api.model.Product;
import com.example.api.payload.SearchProductKeyWordRequest;
import com.example.api.payload.SearchProductsRequest;

@Repository
public class ProductEntityManagerRepo {
    @Autowired
    private EntityManager productEntityManager;

    public List<Product> findProductsByFilters(SearchProductsRequest searchProductsRequest){
        try{
            String catName = searchProductsRequest.getCategoryName();
            String subCatName = searchProductsRequest.getSubCategoryName();
            String subCatNameFilter = !subCatName.equals("none") ? " AND sc.name = '" + subCatName + "' " : "";
            String onlyUsedProduct = searchProductsRequest.isOnlyUsedProduct() == true ? "AND p.used_product = true " : "";
            String OrderByStatment = !searchProductsRequest.getField().equals("none") ? " ORDER BY " + searchProductsRequest.getField() + " " + searchProductsRequest.getOption() : " ORDER BY p.created_on DESC";
            String pagination = " LIMIT " + String.valueOf(searchProductsRequest.getLimit()) + "," + String.valueOf(searchProductsRequest.getOffset());
            String wilayaJoinClause = "";
            String whereClause = "WHERE c.name = '" + catName + "'" + subCatNameFilter;

            if (!searchProductsRequest.getWilaya().equals("none")){
                wilayaJoinClause = " INNER JOIN cities ct on p.city_id = ct.id ";
                whereClause = whereClause + " AND (ct.wilaya = '" + searchProductsRequest.getWilaya() + "' OR ct.wilaya_arabic = '" + searchProductsRequest.getWilaya() + "')"; 
            }

            String mainSqlQuerry = "select * from Products p " + wilayaJoinClause + " WHERE p.sub_category_id IN (SELECT sc.id FROM sub_categories sc INNER JOIN categories c on sc.category_id = c.id " + whereClause + onlyUsedProduct + ")" + OrderByStatment + pagination;
            Query query = productEntityManager.createNativeQuery(mainSqlQuerry, Product.class);

            return query.getResultList();
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    public List<Product> getProductListByKeyWord(SearchProductKeyWordRequest searchProductKeyWordRequest){
        String matchMode = "IN BOOLEAN MODE";
        try{
            String keyWord = searchProductKeyWordRequest.getKeyWord();
            String pagination = " LIMIT " + String.valueOf(searchProductKeyWordRequest.getLimit()) + "," + String.valueOf(searchProductKeyWordRequest.getOffset());
            String onlyUsedProduct = searchProductKeyWordRequest.isOnlyUsedProduct() == true ? "AND p.used_product = true " : "";
            String wilayaFilter = !searchProductKeyWordRequest.getWilaya().equals("none") ? " AND (ct.wilaya = '" + searchProductKeyWordRequest.getWilaya() + "' OR ct.wilaya_arabic = '" + searchProductKeyWordRequest.getWilaya() + "')" : "";

            String mainSqlQuerry = "SELECT *, MATCH(p.name) AGAINST('" + keyWord + "' " + matchMode + ") AS name_index, " + 
            "MATCH(p.brand) AGAINST('" + keyWord + "' " + matchMode + ") AS brand_index, " +
            "MATCH(p.description) AGAINST('" + keyWord + "' " + matchMode + ") AS description_index, " + 
            "MATCH(p.related_info) AGAINST('" + keyWord + "' " + matchMode + ") AS related_info_index, " +
            "MATCH(p.name, p.description, p.brand, p.related_info) " + 
            "AGAINST('" + keyWord + "' " + matchMode + ") AS score " +
            "from products p INNER JOIN cities ct on p.city_id = ct.id " +
            "WHERE MATCH (p.name, p.description, p.brand, p.related_info) " + 
            "AGAINST('" + keyWord + "' " + matchMode + ") " +
            onlyUsedProduct + " " +
            wilayaFilter + " " + 
            "HAVING score > 0 " +
            "ORDER BY (name_index*5)+(brand_index*1.5)+(description_index)+(related_info_index*1.5)+(p.created_on) DESC " + pagination;
            Query query = productEntityManager.createNativeQuery(mainSqlQuerry, Product.class);
            return query.getResultList();
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    public List<String> getProductsNameByKeyWord(String kw){
        String keyWord = kw.toLowerCase();
        String matchMode = "IN BOOLEAN MODE";
        try{
            String mainSqlQuerry = "SELECT *, MATCH(p.name) AGAINST('" + keyWord + "' " + matchMode + ") AS name_index, " + 
                "MATCH(p.brand) AGAINST('" + keyWord + "' " + matchMode + ") AS brand_index, " +
                "MATCH(p.description) AGAINST('" + keyWord + "' " + matchMode + ") AS description_index, " + 
                "MATCH(p.related_info) AGAINST('" + keyWord + "' " + matchMode + ") AS related_info_index, " +
                "MATCH(p.name, p.description, p.brand, p.related_info) " + 
                "AGAINST('" + keyWord + "' " + matchMode + ") AS score " +
                "from products p " +
                "WHERE MATCH (p.name, p.description, p.brand, p.related_info) " + 
                "AGAINST('" + keyWord + "' " + matchMode + ") " + 
                "HAVING score > 0 UNION ALL SELECT *, COUNT(p.name), COUNT(p.name), COUNT(p.name), COUNT(p.name), COUNT(p.name) FROM products p WHERE " + 
                "(LOWER(p.name) like '%" + keyWord + "%' OR LOWER(p.brand) like '%" + keyWord + "%' OR LOWER(p.related_info) like '%" + keyWord + "%') " +
                "OR (LOWER(p.name) like '%" + keyWord + "' OR LOWER(p.brand) like '%" + keyWord + "' OR LOWER(p.related_info) like '%" + keyWord + "') " +
                "OR (LOWER(p.name) like '" + keyWord + "%' OR LOWER(p.brand) like '" + keyWord + "%' OR LOWER(p.related_info) like '" + keyWord + "%') " +
                "ORDER BY (name_index*4)+(brand_index)+(description_index)+(brand_index)+(related_info_index) DESC LIMIT 7";

            Query q = productEntityManager.createNativeQuery(mainSqlQuerry, Product.class);
            List<String> names = new ArrayList<>();
            for (Product product : (List<Product>) q.getResultList()) {
                names.add(product.getName());
            }
            return names;
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }


    
}
