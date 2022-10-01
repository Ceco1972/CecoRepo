--1. Кои са продуктите, на които дължим 30 % от стойността на продажбите в периода 2014-2016

    WITH
        sales
        AS(SELECT
            t3.product_name product
        ,   SUM(t2.quantity*t2.unit_price) productSum
            
        FROM ORDERS t1
            INNER JOIN 
            ORDER_DETAILS t2
                ON t2.order_id = t1.order_id
            INNER JOIN
                PRODUCTS t3
                ON t3.product_id = t2.product_id
            WHERE EXTRACT(YEAR FROM t1.order_date) BETWEEN 2014 AND 2016
                
            GROUP BY t3.product_name)
    
    , stats
        AS(SELECT 
                    s.product product
                ,   SUM(s.productSum)    
                    OVER (
                    ORDER BY s.productSum DESC
                    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
                    ) CUM_PRODUCTS
            ,   SUM (s.productSum)
                    OVER (
                    ORDER BY s.productSum DESC
                    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
                    ) TOTAL_PRODUCTS
                              
            FROM sales s)
SELECT
    st.product
,   st.cum_products 
FROM
sales sa
    INNER JOIN
stats st
    ON st.product = sa.product
WHERE st.CUM_PRODUCTS/st.TOTAL_PRODUCTS*100 < 30    

            
