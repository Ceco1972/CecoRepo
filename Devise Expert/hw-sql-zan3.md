### Задача 2 (LIKE)

Изведете списък на всички доставчици на продукти, на които лицето за контакт
има длъжност 'Sales Representative' или 'Sales Agent'

| Supplier ID | Company Name | Contact Name | Contact Title | Country | Phone |
| ---         | ---          | ---          | ---           | ---     | ---   |


```sql
 SELECT
    supplier_id,
    company_name,
    contact_name,
    contact_title,
    country,
    phone
    
    FROM
        SUPPLIERS
    WHERE
        contact_title LIKE 'Sales Representative' 
        OR contact_title LIKE 'Sales Agent'
--  contact_title IN ('Sales Representative', 'Sales Agent')
```

### Задача 2.1 (RE)

Всички клиенти, на които лицето за контакт има фамилия завършваща на 
"son" (напр. Maria Anderson) или "ez" (напр. Fernando Gozalez).


| Customer Code | Company Name | Contact Name | Country |
| ---           | ---          | ---          | ---     |
|               |              |              |         |


```sql
SELECT
   customer_code,
   company_name,
   contact_name,
   country
   
FROM
    customers
WHERE
    REGEXP_LIKE  (contact_name, '(son|EZ)\s?$')

```

### Задача 2.2 (RE)

Всички продукти, които се продават в бутилки (колоната е quantity_per_unit)
от 12 oz (унции).


| Product ID | Product Name | Quantity Per Unit | Unit Price |
| ---        | ---          | ---               | ---        |
|            |              |                   |            |


```sql

SELECT
   product_id,
   product_name,
   quantity_per_unit,
   unit_price
   
FROM
    products
WHERE
    REGEXP_LIKE  (quantity_per_unit, '12\soz\sbottles$')
ORDER BY unit_price
    , product_name

```

