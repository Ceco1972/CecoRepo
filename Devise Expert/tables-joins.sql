WITH cust(cid, cust_name) AS (
        SELECT 11, 'John'   FROM DUAL UNION
        SELECT 12, 'Anna'   FROM DUAL UNION
        SELECT 13, 'Maria'  FROM DUAL UNION
        SELECT 14, 'Peter'  FROM DUAL UNION
        SELECT 15, 'George' FROM DUAL 
)
, sales( slid, order_date, amount,cid) AS (
        SELECT 21, TO_DATE('2020-01-10'), 250, 11   FROM DUAL UNION
        SELECT 22, TO_DATE('2020-05-12'),  80, 12   FROM DUAL UNION
        SELECT 23, TO_DATE('2020-06-15'), 130, 12   FROM DUAL UNION
        SELECT 24, TO_DATE('2020-04-02'),  60, NULL FROM DUAL UNION
        SELECT 25, TO_DATE('2020-05-09'), 120, NULL FROM DUAL 
)
, transactions(tid, card, am_paid, slid) AS (
        SELECT 31, 'VISA'  , 100, 21 FROM DUAL UNION
        SELECT 32, 'VISA'  , 150, 21 FROM DUAL UNION
        SELECT 33, 'MASTER',  80, 22 FROM DUAL UNION
        SELECT 34, 'CASH'  ,  60, 24 FROM DUAL UNION
        SELECT 35, 'CASH'  , 120, 25 FROM DUAL 
)
SELECT  
  *
FROM 
  cust c
    INNER JOIN
  sales s
    ON s.cid = c.cid
    INNER JOIN
  transactions t
    ON t.slid = s.slid
  
