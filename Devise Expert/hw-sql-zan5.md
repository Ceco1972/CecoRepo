## Изчисления в SELECT (Single-row Functions)
https://docs.oracle.com/cd/E11882_01/server.112/e41084/functions.htm#SQLRF006


### Задача 8 

Изведете списък на поръчките по години и месеци като резултата трябва да е 
сортиран по години и месеци в съответната година. Опитайте се да изведете 
месеца с името му.

| OrderID | Customer | Year  | Month  |
| ------- | -------- | ----- | ------ |
|         |          |       |        |

```sql
SELECT
    t1.order_id
,   t2.company_name
,   EXTRACT ( YEAR FROM t1.order_date) Year
,   '     ' || TO_CHAR ( t1.order_date, 'month' ) Month


FROM
ORDERS t1
   INNER JOIN
CUSTOMERS t2
    ON
    t1.customer_id = t2.customer_id

ORDER BY
t1.order_date 


```
  
### Задача 9

Изведете списък с поръчките и дните, за които те са изпълнени. Като дните за 
изпълнение представляват разликата между order_date и shipped_date

| Order ID | Customer Code | Order Date | Days |
| -------- | ------------- | ---------- | ---- |
|          |               |            |      |

```sql

SELECT
    t1.order_id
,   t2.customer_code
,   t1.order_date
,   t1.shipped_date - t1.order_date Days
,  t1.shipped_date

FROM

ORDERS t1
    INNER JOIN
CUSTOMERS t2
    ON t2.CUSTOMER_ID = t1.CUSTOMER_ID
    
ORDER BY
    t1.order_date DESC
    
```

### Задача 10

Изведете списък с клиентите като след името на фирмата следват държава и град 
(например: Астра ООД - България, София ), а лицата за контакт са само с фамилия 
и след фамилията следва телефон ( например: Иванов, 999-88-23 ).

| Customer Code | Company Name | Contact Name |
| ------------- | ------------ | ------------ |
|               |              |              |

```sql

    SELECT
    t1.customer_code
,   t1.company_name || ' - ' || t1.country || ', ' || t1.city Company_Name_Country_City 
,   SUBSTR(contact_name, INSTR(TRIM(contact_name),' ', -1, 1)) || ', ' || t1.phone Contact_Name_Phone

FROM
    CUSTOMERS t1
    
ORDER BY
    2


```

* същото с RegEx (за фамилията)

```sql
SELECT
    t1.customer_code
,   t1.company_name || ' - ' || t1.country || ', ' || t1.city Company_Name_Country_City 
,   REGEXP_REPLACE(t1.contact_name, '^(\w).+\s(\w+)\s?$', '\2') || ', ' || t1.phone Contact_Name_Phone

FROM
    CUSTOMERS t1
    
ORDER BY
    2
```

### Задача 11  

Изведете списък с поръчките и продуктите закупени от клиента с код ALFKI като 
сумата платена за всеки продукт ( единична_цена х количество ) се представи 
в лева и USD ( в таблицата са в USD ) и е закръглена до втория знак.

| Customer Code | Order ID | Product Name | Total ( USD) | Total ( BGN ) |
| ------------- | -------- | ------------ | ------------ | ------------  |
|               |          |              |              |               |


```sql
SELECT
    t2.customer_code Cust_Code
,   t1.order_id Order_ID
,   t4.product_name Product
,   TO_CHAR(t4.unit_price*t3.quantity, '999.99') Total_USD
,   TO_CHAR(t4.unit_price*t3.quantity*1.96, '9999.99') Total_BGN

FROM
orders t1
    INNER JOIN
customers t2
    ON t2.customer_id = t1.customer_id
    INNER JOIN
order_details t3
    ON t3.order_id = t1.order_id
    INNER JOIN
products t4
    ON t4.product_id = t3.product_id
    WHERE 
    t2.customer_code = 'ALFKI'
```
