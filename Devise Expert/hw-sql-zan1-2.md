## Филтриране на резултати


### Задача 1

Изведете списък на всички фирми (Customers) от Germany.


| Company Name | Phone | City |
| ---          | ---   | ---  |
|              |       |      |


```sql
-- поставете отговора тук
  SELECT
    company_name
   ,phone
   ,city
   
FROM
   customers
   
   WHERE 
 country = 'Germany'
```


### Задача 3

Изведете списък на всички поръчки направени през май 2015г

| Order ID | Order Date | Customer ID | Shipped Date(дата на изпращане) |
| ---      | ---        | ---         | ---                             |



```sql
SELECT
    order_id
   , order_date
   , customer_id
   ,shipped_date
   
FROM
   orders
   
   WHERE 
shipped_date BETWEEN '2015-05-01' AND '2015-05-31'
```
