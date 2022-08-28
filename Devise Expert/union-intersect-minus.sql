WITH customers1(cid, firstname, lastname) AS (
    SELECT 11, 'John', 'Doe' FROM DUAL UNION
    SELECT 12, 'Anna', 'Smith' FROM DUAL UNION
    SELECT 13, 'Maria', 'Anders' FROM DUAL UNION
    SELECT 14, 'Markus', 'Handke' FROM DUAL UNION
    SELECT 18, 'Michael', 'Rotger' FROM DUAL )
, customers2(cid,firstname, lastname) AS (
    SELECT 11, 'John', 'Doe' FROM DUAL UNION
    SELECT 12, 'Anna', 'Smith' FROM DUAL UNION
    SELECT 16, 'Jane', 'Geiss' FROM DUAL UNION
    SELECT 17, 'Jorg', 'Orlowski' FROM DUAL )
SELECT c1.*
FROM customers1 c1
UNION
SELECT c2.*
FROM customers2 c2
ORDER BY 1
