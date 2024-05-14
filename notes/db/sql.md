# SQL

#### Операции с базами данных:

```sql
-- создать:
CREATE DATABASE db_name OWNER owner_name;
-- удалить:
DROP DATABASE db_name;
-- переименовать:
ALTER DATABASE db_name RENAME TO new_db_name;
```

#### Операции с таблицами:

```sql
-- создать таблицу:
CREATE TABLE table_name(col_1_name col_1_type, ...);
-- удалить таблицу:
DROP TABLE table_name;

-- добавить столбец:
ALTER TABLE table_name ADD COLUMN column_name;
-- удалить столбец:
ALTER TABLE table_name DROP COLUMN column_name;
-- переименовать столбец:
ALTER TABLE table_name RENAME COLUMN old_name TO new_name;
-- изменить тип столбца:
ALTER TABLE table_name ALTER COLUMN column_name datatype;
```

#### Операции с данными таблицы:

```sql
-- добавить записи:
INSERT INTO table_name (col_1, ...) VALUES (col_1_value, ...), (...);
-- удалить записи:
DELETE FROM table_name WHERE ...;
-- изменить записи:
UPDATE table_name SET col_1 = col_1_value, col_2 = ... WHERE ...;
-- очистить таблицу:
TRUNCATE TABLE tablename;
```

## PostgreSQL

```bash
psql <dbname> <username>
psql -h <hostname> -p <port> -U <username> -d <database>
psql "postgresql://<username>:<password>@<hostname>:<port>/<database>"
```

#### Быстрые команды psql:

`\l` — список БД на сервере<br/>
`\dt` — список таблиц в БД<br/>
`\du` — список ролей<br/>
`\d table_name` — структура таблицы<br/>
`\password user_name` — изменить пароль<br/>

`\q` — выйти из psql<br/>
`\! clear` (Unix) и `\! cls` (Windows) — очистить экран<br/>

#### Другое:

Рестарт сервера для Windows:

```cmd
pg_ctl -D "C:\Program Files\PostgreSQL\15\data" restart
```

Типы колонок:

```sql
SELECT * FROM information_schema.columns WHERE table_name = 'table_name';
```
