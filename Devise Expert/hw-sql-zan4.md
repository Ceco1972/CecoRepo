## Свързване на таблици в SELECT

### Задача 4

Изведете коя куриерска фирма какви продукти е доставяла през 2015г 
( ```orders.ship_via = shippers.shipper_id``` )

| Company Name(Shippers) | Product Name | Quantity |
| ---                    | ----         | ---      |


```sql
SELECT
   t1.company_name,
   t4.product_name,
   t3.quantity
FROM
    shippers t1
        INNER JOIN
     orders t2
         ON
    t1.shipper_id = t2.ship_via
        INNER JOIN
        order_details t3
        ON
    t2.order_id = t3.order_id
        INNER JOIN
        products t4
       ON
        t3.product_id = t4.product_id
WHERE
t2.order_date BETWEEN  '2015-01-01' AND '2015-12-31'
ORDER BY
1


```

### Задача 5

Кои служители са обслужвали клиентите с код ALFKI, BOLID, FISSA?


| Last Name | First Name | Company Name | Customer Code | Order Date |
| ---       | ---        | ---          | ---           | ---        |


```sql

SELECT
    t2.lastname,
    t2.firstname,
    t3.company_name,
    t3.customer_code,
    t1.order_date

FROM
    ORDERS t1 
        INNER JOIN
    EMPLOYEES t2
        ON t2.employee_id = t1.EMPLOYEE_ID
        INNER JOIN
    CUSTOMERS t3
        ON t3.CUSTOMER_ID = t1.CUSTOMER_ID
WHERE t3.customer_code IN ('ALFKI', 'BOLID', 'FISSA')
ORDER BY 
1
```


### Задача 6

Кои клиенти са закупували продукти от категориите Seafood,  Beverages?
( Total  e  unitprice * quantity )

| Category Name | CompanyName | OrderID | OrderDate | Product Name | Total |
| ---           | ---         | ---     | ---       | ---          | ---   |


```sql
SELECT
    t4.category_name,
    t5.company_name,
    t1.order_id,
    t1.order_date,
    t3.product_name,
    t2.unit_price * t2.quantity Total

FROM
    ORDERS t1
        INNER JOIN 
    ORDER_DETAILS t2
        ON 
    t2.ORDER_ID = t1.ORDER_ID
        INNER JOIN
    PRODUCTS t3
        ON
    t3.PRODUCT_ID = t2.PRODUCT_ID
        INNER JOIN
    CATEGORIES t4
        ON
    t4.CATEGORY_ID = t3.CATEGORY_ID
        INNER JOIN
    CUSTOMERS t5
        ON t1.CUSTOMER_ID = t5.CUSTOMER_ID

WHERE 
t4.CATEGORY_NAME IN ('Seafood', 'Beverages')
ORDER BY
2

```

### Задача 7 

Изведете списък на служителите и продуктите, които те са продали през май 2015г.
В резултата трябва да присъства и кода на клиента. Колоната Total e unitprice *
quantity.

| Last Name | First Name | Product Name | Order Date | Customer Code | Total |
| ---       | ---        | ---          | ---        | ---           | ---   |


```sql
SELECT 
    t4.lastname,
    t4.firstname,
    t3.product_name,
    t1.order_date,
    t5.customer_code,
    t2.unit_price * t2.quantity Total

FROM 
    ORDERS t1
        INNER JOIN 
    ORDER_DETAILS t2
        ON t2.ORDER_ID = t1.ORDER_ID
        INNER JOIN
    PRODUCTS t3
        ON t3.PRODUCT_ID = t2.PRODUCT_ID
        INNER JOIN
    EMPLOYEES t4
        ON t4.EMPLOYEE_ID = t1.EMPLOYEE_ID
        INNER JOIN
    CUSTOMERS t5
        ON t1.CUSTOMER_ID = t5.CUSTOMER_ID

WHERE t1.ORDER_DATE BETWEEN '2015-05-01' AND '2015-05-31'
ORDER BY
1

```


