# SQL

#### Операции с таблицами {#table-operations}

```sql
-- создать
CREATE TABLE table_name(name_1 type_1, name_2 type_2);
-- удалить
DROP TABLE table_name;
-- переименовать
ALTER TABLE old_name RENAME TO new_name;
```

#### Операции над колонками {#column-operations}

```sql
-- добавить
ALTER TABLE table_name ADD COLUMN column_name column_type;
-- удалить
ALTER TABLE table_name DROP COLUMN column_name;
-- переименовать
ALTER TABLE table_name RENAME COLUMN old_name TO new_name;

-- добавить/заменить значение по умолчанию
ALTER TABLE table_name ALTER COLUMN column_name SET DEFAULT expression;
-- удалить значение по умолчанию
ALTER TABLE table_name ALTER COLUMN column_name DROP DEFAULT;

-- добавить ограничение на NULL
ALTER TABLE table_name ALTER COLUMN column_name SET NOT NULL;
-- снять ограничение на NULL
ALTER TABLE table_name ALTER COLUMN column_name DROP NOT NULL;
-- добавить ограничение уникальности
ALTER TABLE table_name ADD CONSTRAINT name UNIQUE (column_name);

-- изменить тип столбца
ALTER TABLE table_name ALTER COLUMN column_name TYPE datatype;
```

#### Операции с данными {#data-operations}

```sql
-- добавить записи
INSERT INTO table_name (col_1, col_2) VALUES (value_1, value_2), (...);
-- удалить записи
DELETE FROM table_name WHERE expression;
-- изменить записи
UPDATE table_name SET col_1 = value_1, col_2 = value_2 WHERE expression;
-- очистить таблицу:
TRUNCATE TABLE tablename;
```

## PostgreSQL

```bash
psql <dbname> <username>
psql -h <hostname> -p <port> -U <username> -d <database>
psql "postgresql://<username>:<password>@<hostname>:<port>/<database>"
```

#### Быстрые команды psql {#psql-meta-commands}

`\l` — список БД на сервере<br/>
`\c db_name` — подключиться к другой БД<br/>
`\password user_name` — изменить пароль

`\dt` — список таблиц<br/>
`\du` — список ролей<br/>
`\d table_name` — структура таблицы

`\q` — выйти из psql<br/>
`\! clear` (Unix) или `\! cls` (Windows) — очистить экран

#### Некоторые системные таблицы {#pg-system-catalogs}

+ `pg_database`: информация о доступных базах данных
+ `pg_attribute`: информация о столбцах таблицы
+ `pg_constraint`: ограничения (pkey, unique, check, etc.)
+ `pg_index`: информация об индексах

#### Другое {#pg-other}

```sql
-- размер базы данных
SELECT pg_size_pretty(pg_database_size('db_name'));
-- размер таблицы
SELECT pg_size_pretty(pg_relation_size('table_name'));
```

Рестарт сервера для Windows:

```cmd
pg_ctl -D "C:/Program Files/PostgreSQL/17/data" restart
```

Типы колонок:

```sql
SELECT * FROM information_schema.columns WHERE table_name = 'table_name';
```
