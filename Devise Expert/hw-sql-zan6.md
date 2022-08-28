## Агрегиращи функции

### Задача 12 

В коя категория по колко продукта има?

| Category Name | Num Products |
| ------------- | ------------ |
|               |              |

    ```sql
SELECT
    t2.category_name
,   Count(*) Number_of_Products
FROM
    products t1
       INNER JOIN
    categories t2
       on t1.category_id = t2.category_id
    
GROUP BY
    t2.category_name

ORDER BY
    2 --Count(*)
```

### Задача 13 

Кой продукт в какво количество и на каква обща стойност е бил закупуван?

| Product Name | Total Quantity (units) | Total Sales ($) |
| ------------ | ---------------------- | --------------- |
|              |                        |                 |


```sql
SELECT
    t1.product_name
,   SUM(t2.quantity) Quantity
,   SUM(t2.quantity * t2.unit_price*1.95) total_sales_$
FROM
    products t1
       INNER JOIN
    order_details t2
       on t1.product_id = t2.product_id
       INNER JOIN
    orders t3
        on t2.order_id = t3.order_id
    
GROUP BY
    t1.product_name


```

| ID  | Продукт | Кол-во | Ед.цена |
| --- | ------- | ------ | ------  |
| 2   | Ябълки  | 5      | 2       |
| 56  | Ябълки  | 2      | 2.5     |

| ------- | ------- | ------ |
| Ябълки  | 7       | 15     |


### Задача 14 

Kой служител на каква стойност поръчки е обслужвал през  периода 2014-2016г?
Данните трябва да са подредени по фамилия и година.

| Last Name | Year  | Total Sales ($) |
| --------- | ----- | --------------- |
|           |       |                 |


```sql
SELECT
    t1.lastname
,   EXTRACT (YEAR FROM t2.order_date) Year
,   TO_ChAR ( SUM(t3.quantity*t3.unit_price), 99999.99) Sales
  
FROM
    EMPLOYEES t1
      LEFT OUTER JOIN
    ( ORDERS t2
        INNER JOIN 
      ORDER_DETAILS t3
        ON t3.order_id = t2.order_id
    )
       
      
        ON t2.employee_id = t1.employee_id
      GROUP BY
      t1.lastname
,     EXTRACT (YEAR FROM t2.order_date)
        
    ORDER BY 
    1, 2 

```
