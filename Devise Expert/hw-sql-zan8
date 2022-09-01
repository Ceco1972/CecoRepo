//ОТ КОЯ ДЪРЖАВА КОЛКО ПОРЪЧКИ ИМА В ДИАПАЗОНИТЕ ДО 1000, 1000-4000, НАД 4000

    WITH 
            salesByCountry
                AS (SELECT 
                 t3.country
            ,    t1.order_id
            ,    SUM(t2.quantity*t2.unit_price) sales
            
            FROM 
                customers t3
                    INNER JOIN
                ORDERS t1
                    ON t1.customer_id = t3.customer_id
                    INNER JOIN
                order_details t2
                    ON t2.order_id = t1.order_id
                    
            GROUP BY
                t3.country
            ,   t1.order_id)
     
,       stats
        AS (SELECT
                    s.country
            ,       SUM(CASE WHEN s.sales < 1000 THEN 1 ELSE 0 END)                                 LessThan1000
            ,       AVG(CASE WHEN s.sales < 1000 THEN 1 ELSE 0 END)                                 PercentLessThan1000
            ,       SUM(CASE WHEN s.sales BETWEEN 1000 AND 4000 THEN 1 ELSE 0 END)                  Between1000And4000
            ,       SUM(CASE WHEN s.sales > 4000 THEN 1 ELSE 0 END)                                 Over4000
            ,       COUNT(*)                                                                         NumberSales
            ,       SUM(s.sales)                                                                    Total
            
                    FROM salesByCountry s
                    GROUP BY s.country)
                    
SELECT 
    st.COUNTRY
,   st.LessThan1000
,   Round(st.PercentLessThan1000, 2) PercentLessThan1K
,   st.Over4000
,   st.NumberSales
,   st.Total
FROM stats st
UNION
SELECT 
    NULL
,   SUM(st.LessThan1000)
,   NULL
,   SUM(st.Over4000)
,   SUM(st.NumberSales)
,   SUM(st.Total)
FROM STATS st
       
       Order by
       1