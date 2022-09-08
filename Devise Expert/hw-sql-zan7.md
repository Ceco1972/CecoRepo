# Вложени заявки (WITH)

### Задача 15 

Направете отчет за всяка куриерска фирма по колко продукта  и поръчки е доставила
и каква е стойността на поръчките.

| Company Name | Num Products | Num Orders  | Total Orders ($) |
| ------------ | ------------ | ----------- | ---------------- |
|              |              |             |                  |

```sql
  WITH 
    sales
    AS (SELECT
       t3.company_name
,      t1.order_id
,      Count(*) n_items
,      Sum(t2.quantity*t2.unit_price) total
--,      t2.product_id
        FROM 
            shippers t3
               INNER JOIN
            orders t1
               ON 
            t1.ship_via = t3.shipper_id
               INNER JOIN
            ORDER_DETAILS t2
               on t2.order_id = t1.order_id
        GROUP BY 
       t3.company_name
,      t1.order_id )

SELECT 
     sh.company_name
,    Sum(vt.n_items) Num_Products
,    Count(vt.order_id) Num_Orders
,    Sum(vt.total) Total_Orders
 
FROM
    shippers sh
        LEFT OUTER JOIN
    sales vt
        ON
          vt.company_name = sh.company_name

GROUP BY
   sh.company_name
```

### Задача 16

За всяка куриерска фирма да се направи отчет съдържащ:

| Company Name | MinProds | AvgProds | MAXProds | MinOrders | AvgOrders | MaxOrders |
| ------------ | -------- | -------  | -------- | --------  | --------- | --------  |
|              |          |          |          |           |           |           |


където:

MinProds - минимално количество доставени продукти с 1 поръчка (брой)
AvgProds - средно по колко продукта доставя (брой)
MaxProds - максимално количество доставени продукти с 1 поръчка (брой)

MinOrders - минимална стойност на доставена поръчка (USD $)
AvgOrders - средна стойност на доставена поръчка (USD $)
MaxOrders - максимална стойност на доставена поръчка (USD $)

```sql
  WITH 
    sales
    AS (SELECT
       t3.company_name
,      t1.order_id
,      Count(*) num_prod
,      Sum(t2.quantity*t2.unit_price) total
--,      t2.product_id
        FROM 
            shippers t3
               INNER JOIN
            orders t1
               ON 
            t1.ship_via = t3.shipper_id
               INNER JOIN
            ORDER_DETAILS t2
               on t2.order_id = t1.order_id
        GROUP BY 
            t3.company_name
,           t1.order_id )

SELECT 
     sh.company_name
,    Min(vt.num_prod) MinProds
,    Round(Avg(vt.num_prod)) AvgProds
,    Max(vt.num_prod) MaxProds
,    Min(vt.total) MinOrders
,    Round(Avg(vt.total)) AvgOrders
,    Max(vt.total) MaxOrders
,    Count(vt.order_id) Num_Orders
,    Sum(vt.total) Total_Orders
 
FROM
    shippers sh
        LEFT OUTER JOIN
    sales vt
        ON
          vt.company_name = sh.company_name

GROUP BY
   sh.company_name
```


## Задача 17

Направете отчет за общата стойност на поръчките по държави и клиенти, за които
общата стойност на поръчките е над средната за държавата, от която е клиента.

| Country | Company Name | Total |
| ------  | ------------ | ----  |
|         |              |       |


```sql
WITH 
    sales
    AS (SELECT
   t1.company_name
,  Sum(t3.quantity*t3.unit_price) OrderValue
   

FROM
    CUSTOMERS t1
        LEFT OUTER JOIN
            (ORDERS t2
                INNER JOIN
            ORDER_DETAILS t3
                 ON
             t2.order_id = t3.order_id)
        ON
            t2.customer_id = t1.customer_id
       
GROUP BY
   t1.company_name

ORDER BY
1)

SELECT 
    t1.country
,  t1.company_name
,  vt.ordervalue total 
FROM 

CUSTOMERS t1
        LEFT OUTER JOIN
    sales vt
        ON
        t1.company_name = vt.company_name


WHERE 
vt.OrderValue > (SELECT
   Avg(vt.OrderValue)
FROM
    CUSTOMERS t1
        LEFT OUTER JOIN
    sales vt
        ON
        t1.company_name = vt.company_name)

```

| Country | Company | Orderid | Total |
| ------- | ------- | ------- | ----- |
| BG      | X       | 11      | 100   |
| BG      | X       | 12      | 100   |
| BG      | X       | 13      | 100   |
| BG      | Y       | 14      | 100   |


BG Average: 200

| Country | Company | Total  |
| ------- | ------- | ------ |
| BG      | X       | 300    |



## Задача 18:

Изчислете стойността на продажбите реализирани от служителите за всяко тримесечие
на 2015г.


| FirstName LastName | Q1  | Q2  | Q3  | Q4  | Total (2015) |
| ------------------ | --- | --- | --- | --- | ------------ |
| ...                | ... | ... | ... | ... | ...          |
| ------------------ | --- | --- | --- | --- | ------------ |
| Grand Total        | ... | ... | ... | ... | ...          |


```sql

SELECT
    ns.firstname || ' ' || ns.lastname Name
,   (SELECT Sum(t3.quantity*t3.unit_price) 
FROM
    EMPLOYEES t1
        LEFT OUTER JOIN 
    (ORDERS t2
        INNER JOIN 
    ORDER_DETAILS t3    
        ON
           t3.order_id = t2.order_id)
        ON
          t2.employee_id = t1.employee_id
    WHERE (To_Char (t2.order_date, 'Q') = '1') AND (EXTRACT(YEAR FROM t2.order_date) = 2015) AND t1.lastname = ns.lastname
    ) Q1_2015
,   (SELECT Sum(t3.quantity*t3.unit_price) 
FROM
    EMPLOYEES t1
        LEFT OUTER JOIN 
    (ORDERS t2
        INNER JOIN 
    ORDER_DETAILS t3    
        ON
           t3.order_id = t2.order_id)
        ON
          t2.employee_id = t1.employee_id
    WHERE (To_Char (t2.order_date, 'Q') = '2') AND (EXTRACT(YEAR FROM t2.order_date) = 2015) AND t1.lastname = ns.lastname
    ) Q2_2015
,   (SELECT Sum(t3.quantity*t3.unit_price) 
FROM
    EMPLOYEES t1
        LEFT OUTER JOIN 
    (ORDERS t2
        INNER JOIN 
    ORDER_DETAILS t3    
        ON
           t3.order_id = t2.order_id)
        ON
          t2.employee_id = t1.employee_id
    WHERE (To_Char (t2.order_date, 'Q') = '3') AND (EXTRACT(YEAR FROM t2.order_date) = 2015) AND t1.lastname = ns.lastname
    ) Q3_2015
,   (SELECT Sum(t3.quantity*t3.unit_price) 
FROM
    EMPLOYEES t1
        LEFT OUTER JOIN 
    (ORDERS t2
        INNER JOIN 
    ORDER_DETAILS t3    
        ON
           t3.order_id = t2.order_id)
        ON
          t2.employee_id = t1.employee_id
    WHERE (To_Char (t2.order_date, 'Q') = '4') AND (EXTRACT(YEAR FROM t2.order_date) = 2015) AND t1.lastname = ns.lastname
    ) Q4_2015
,   (SELECT Sum(t3.quantity*t3.unit_price) 
FROM
    EMPLOYEES t1
        LEFT OUTER JOIN 
    (ORDERS t2
        INNER JOIN 
    ORDER_DETAILS t3    
        ON
           t3.order_id = t2.order_id)
        ON
          t2.employee_id = t1.employee_id
    WHERE ( EXTRACT(YEAR FROM t2.order_date) = 2015) AND t1.lastname = ns.lastname
) Total
FROM
    EMPLOYEES ns
    order by 1
```

За Q1-4 погледнете TO_CHAR()

---------

Същата задача решена от инструктора:

--Изчислете стойността на продажбите реализирани от служителите за всяко тримесечие
--на 2015г.
    WITH 
         sales
                AS(SELECT
                    emp.firstname || ' ' || emp.lastname employee
                ,   TO_CHAR(ord.order_date, 'Q') Quarter
                ,   SUM(od.quantity*od.unit_price) Total
            
                  FROM
                    EMPLOYEES emp
                    LEFT OUTER JOIN
                   (ORDERS ord
                        INNER JOIN
                    ORDER_DETAILS od
                        ON
                         ord.order_id = od.order_id)
                    ON
                     ord.employee_id = emp.employee_id
                     WHERE EXTRACT (YEAR FROM ord.order_date) = 2015
                     
                    GROUP BY
                        emp.firstname || ' ' || emp.lastname
                    ,   TO_CHAR(ord.order_date, 'Q'))
                    
            SELECT
                s.employee
            ,   SUM(CASE WHEN s.Quarter = 1 then s.Total ELSE 0 END) "Quarter 1"
            ,   SUM(CASE WHEN s.Quarter = 2 then s.Total ELSE 0 END) "Quarter 2"
            ,   SUM(CASE WHEN s.Quarter = 3 then s.Total ELSE 0 END) "Quarter 3"
            ,   SUM(CASE WHEN s.Quarter = 4 then s.Total ELSE 0 END) "Quarter 4"
            ,   SUM(s.Total) Total
            
            FROM
            sales s
            
            GROUP BY 
            s.employee
               UNION
            SELECT NULL
            ,   SUM(CASE WHEN s.Quarter = 1 then s.Total ELSE 0 END) "Quarter 1"
            ,   SUM(CASE WHEN s.Quarter = 2 then s.Total ELSE 0 END) "Quarter 2"
            ,   SUM(CASE WHEN s.Quarter = 3 then s.Total ELSE 0 END) "Quarter 3"
            ,   SUM(CASE WHEN s.Quarter = 4 then s.Total ELSE 0 END) "Quarter 4"
            ,   SUM(s.Total) Total  
            
            FROM sales s
            GROUP BY NULL                
            ORDER BY 1 NULLS LAST
            -------------------------

