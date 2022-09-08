Само да отбележа, че на задача 18 от предишното задание използвах по невнимание SELECT COUNT(*)
вместо SELECT Sum(t3.quantity*t3.unit_price) и така получавам брой, а не стойност. Пропуснал съм и Total да допълня с Union в тази задача, но компенсирах с Union и Total в задача 26а, където не се изискваше :)
Благодаря ви още веднъж за хубавия курс. Беше много полезен и приятен!

Цветан 
-----

## Задача 19:

Изчислете  в коя държава по колко клиента има.

| Country | Number of Customers |
| ------- | ------------------- |
|         |                     |


```sql
SELECT
    t1.country
,   count(*)
FROM
    CUSTOMERS t1
GROUP BY 
    t1.country
ORDER BY 1
```

## Задача 22:

Направете отчет за броя поръчки по клиенти като предвидите 
категория "други" за фирми  с незначителен брой поръчки. 


| Company Name | Orders |
| ------------ | ------ |
|              |        |

```sql
 
        WITH
           ordersN
           AS (SELECT
            t1.company_name company
        ,   COUNT (*) n_orders
        FROM 
            customers t1
                INNER JOIN
            orders t2
                ON t2.customer_id = t1.customer_id
                
            GROUP BY 
            t1.company_name)
SELECT
    (CASE WHEN os.n_orders < 5 THEN NULL ELSE ' ' END) S
,   (CASE WHEN os.n_orders < 5 THEN 'Other' ELSE os.company END) company
,   SUM (os.n_orders) n_orders
FROM
ordersN os

GROUP BY
        (CASE WHEN os.n_orders < 5 THEN NULL ELSE ' ' END)
    ,   (CASE WHEN os.n_orders < 5 THEN 'Other' ELSE os.company END)
ORDER BY

1 NULLS LAST, 3 DESC
```


* променете заявката така, че категорията други да е за всяка държава

| Country | Company Name | Orders |
| ------- | ------------ | ------ |
| BG      | X            | 20     |
| BG      | Y            | 30     |
| BG      | Others       | 120    |
| UK      | Z            | 16     |
| ...     | ...          | ...    |


```sql

        WITH
           ordersN
           AS (SELECT
           t1.country
        ,   t1.company_name company
        ,   COUNT (*) n_orders
        FROM 
            customers t1
                INNER JOIN
            orders t2
                ON t2.customer_id = t1.customer_id
                
            GROUP BY 
             t1.country
       ,     t1.company_name)
SELECT
    (CASE WHEN os.n_orders < 7 THEN NULL ELSE ' ' END) S
, os.country
,   (CASE WHEN os.n_orders < 7 THEN 'Other' ELSE os.company END) company
,   SUM (os.n_orders) n_orders
FROM
ordersN os

GROUP BY
    (CASE WHEN os.n_orders < 7 THEN NULL ELSE ' ' END)
    , os.country
    ,   (CASE WHEN os.n_orders < 7 THEN 'Other' ELSE os.company END)
ORDER BY

2, 1 NULLS LAST, 4 DESC
```

## Задача 23 (!!CROSS JOIN!!):

Направете отчет за стойността на продажбите и продадените продукти  по клиенти за
2015г и какъв процент от общата стойност на продажбите и продадените продукти за 2015г 
представлява това.

| Company Name | Sales ($) | Products (items)| % of Sales | % Products Sold|
| ------------ | --------- | --------------  | ---------- | -------------- |
|              |           |                 |            |                |

```sql

        WITH 
            sales 
            AS (SELECT
            t1.company_name company
        ,   SUM(t3.quantity*t3.unit_price) sales
        ,   COUNT(*) n_items
        FROM
            customers t1
                INNER JOIN  
            orders t2
                ON t2.customer_id = t1.customer_id
                INNER JOIN
            order_details t3
                ON t3.order_id = t2.order_id
        WHERE EXTRACT(YEAR FROM t2.order_date) = 2015
        GROUP BY 
            t1.company_name)
    , all_orders 
        AS (SELECT
                SUM(od.quantity*od.unit_price) TOTAL_SALES
            ,   COUNT(*) TOTAL_ITEMS
            FROM
                orders os
                    INNER JOIN
                order_details od
                     ON od.order_id = os.order_id
            WHERE EXTRACT(YEAR FROM os.order_date) = 2015)
     
SELECT
    s.company
,   TO_CHAR(s.sales, '99999.99') sales
,   s.n_items
,   ROUND(s.sales/ao.total_sales*100, 2) "Percent of Total Sales"
,   ROUND(s.n_items/ao.total_items*100, 2) "Percent of Products Sold"
FROM
    sales s
CROSS JOIN
    all_orders ao
ORDER BY 
    4 DESC


```

## Задача 25

Направете отчет за продажбите през 2015г на продуктите по категории (обща стойност и 
продадено количество). Определете и какъв % от стойността на продажбите
за дадената категория представляват продажбите на всеки от продуктите в категорията


| Category Name | Product Name | Sales 2015 ($) | % Sales 2015 (category) | Quantity (units) |
| ------------- | ------------ | -------------- | ----------------------- | ---------------- |
|               |              |                |                         |                  |


```sql
        WITH 
            sales
            AS (SELECT
            t1.category_name category
        ,   t2.product_name product
        ,   SUM(t3.quantity*t3.unit_price) SALES_2015
        ,   COUNT(*) QUANTITY
        FROM
            categories t1
                INNER JOIN 
            products t2
                ON t2.category_id = t1.category_id
                INNER JOIN 
            order_details t3
                ON t3.product_id = t2.product_id
                INNER JOIN 
            orders t4
                ON t4.order_id = t3.order_id
                    WHERE EXTRACT(YEAR FROM t4.order_date) = 2015
        GROUP BY
            t1.category_name
        ,   t2.product_name)
        
        , cateSales
        AS(SELECT
            s.category category
        ,   SUM(s.sales_2015) SALES
        FROM
            sales s
        GROUP BY
            s.category)
            
SELECT
sales.category
,   sales.product
,   sales.sales_2015
,   Round(sales.sales_2015/catesales.sales*100, 2) "2015 Percent Sales for the category"
,   sales.quantity
FROM
sales
CROSS JOIN
cateSales
WHERE sales.category = cateSales.category

```
## Задача 26:

Направете справка  на броя поръчки по фирми и определете тези, които формират 
50% от продажбите. 

| Company Name | Orders |
| ------------ | ------ |
|              |        |

```sql

WITH n_orders
    AS(SELECT
            t1.company_name company
        ,   COUNT(*) n_orders
        FROM
        customers t1
            INNER JOIN 
        orders t2
            ON t2.customer_id = t1.customer_id
        GROUP BY 
            t1.company_name)
    , sales
    AS(SELECT
        t1.company_name company
    ,   SUM(t3.quantity*t3.unit_price) sales
    FROM 
        customers t1
     INNER JOIN 
        orders t2
            ON t2.customer_id = t1.customer_id
    INNER JOIN 
        order_details t3
            ON t3.order_id = t2.order_id
    GROUP BY
     t1.company_name)

    , stats
    AS(SELECT
    s.company company
,   SUM(s.sales)
        OVER (
        ORDER BY s.sales DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW 
        ) CUM_SALES
,   SUM(s.sales)
        OVER(
        ORDER BY s.sales DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
        ) TOTAL_SALES

    FROM
    sales s)
    
    SELECT
    st.company
,   sa.n_orders
,   st.cum_sales
,   Round(st.cum_sales/st.total_sales*100, 2) cum_perc
    FROM 
    STATS st
        INNER JOIN 
    n_orders sa
        ON sa.company = st.company
    WHERE st.cum_sales/st.total_sales*100 < 50
    
    UNION 
      
    SELECT
     'ALL CUSTOMERS'
    ,COUNT(*)
    ,SUM(t2.quantity*t2.unit_price)
    ,100
    FROM
    ORDERS t1
    INNER JOIN
    ORDER_DETAILS t2
    ON t1.order_id = t2.order_id
```

## Задача 26.1

Определете за всяка категория продукти, стойността на продажбите с натрупване за
всеки продукт.


| Category Name | Product Name | Total | TotalCum  |
| ------------- | ------------ | ----- | --------- |
| X             | P            | 123   | 123       |
| X             | A            | 200   | 323       |
| ...           | ...          | ...   | ...       |


```sql

WITH
    SALES
            AS(SELECT
            t1.category_name category
        ,   t2.product_name product
        ,   SUM(t3.quantity*t3.unit_price) product_sales
                    
        FROM
            CATEGORIES t1
                INNER JOIN 
            PRODUCTS t2
                ON t2.category_id = t1.category_id
                INNER JOIN
            ORDER_DETAILS t3
                ON t3.product_id = t2.product_id
        GROUP BY 
            t1.category_name
        ,   t2.product_name)
SELECT
    s.category
,   s.product
,   s.product_sales
,   SUM(s.product_sales)
        OVER(
            PARTITION BY s.category
            ORDER BY s.product_sales DESC
            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
            ) CUM_SALES


FROM 
    SALES S
   
   UNION

SELECT
    'ALL CATEGORIES'
,   'ALL PRODUCTS'
,   SUM(t2.quantity*t2.unit_price)
,   SUM(t2.quantity*t2.unit_price)
    
FROM
    ORDERS t1
        INNER JOIN
    ORDER_DETAILS t2
        ON t1.order_id = t2.order_id
```

----

## Задача 28:

За всяка куриерска фирма  изведете общият брой доставени продукти и броя на 
уникалните сред тях и какъв % представляват те.

| Company Name  | Products | Unique Products | % Unique Products |
| ------------- | -------- | --------------- | ----------------- |
|               |          |                 |                   |

```sql
SELECT 
    t1.company_name
,   COUNT (*) Total_products
,   COUNT(DISTINCT t3.product_id) Unique_products
,   Round(COUNT(DISTINCT t3.product_id)/COUNT(*)*100, 2) Percent_unique_products
FROM 
    SHIPPERS t1
        INNER JOIN
    ORDERS t2
        ON t2.ship_via = t1.shipper_id
        INNER JOIN
    ORDER_DETAILS t3
        ON t3.order_id = t2.order_id
WHERE
    t2.shipped_date IS NOT NULL
GROUP BY 
    t1.company_name
ORDER BY 2 DESC
```

## Задача 29:

Направете справка за всяка държава в колко населени места се намират клиентите

| Country | Cities |
| ------- | ------ |
|         |        |


```sql

SELECT
    t1.country
,   COUNT(DISTINCT t1.city) CITIES
FROM
    CUSTOMERS t1
        INNER JOIN
    ORDERS t2
        ON t2.customer_id = t1.customer_id
GROUP BY
    t1.country
ORDER BY 2 DESC       
        
```

