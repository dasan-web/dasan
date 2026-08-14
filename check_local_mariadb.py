import pymysql

try:
  conn = pymysql.connect(
      host='127.0.0.1',
      port=3306,
      user='root',
      password='', # test empty
      cursorclass=pymysql.cursors.DictCursor
  )
  print("Connected to Local MySQL/MariaDB on 3306 with empty password!")
  with conn.cursor() as cursor:
    cursor.execute("SHOW DATABASES;")
    dbs = cursor.fetchall()
    print("Databases:", dbs)
  conn.close()
except Exception as e:
  print("Empty password failed:", e)

# Try common passwords or root user
try:
  conn = pymysql.connect(
      host='127.0.0.1',
      port=3306,
      user='root',
      password='root', # test root
      cursorclass=pymysql.cursors.DictCursor
  )
  print("Connected to Local MySQL/MariaDB on 3306 with password 'root'!")
  with conn.cursor() as cursor:
    cursor.execute("SHOW DATABASES;")
    dbs = cursor.fetchall()
    print("Databases:", dbs)
  conn.close()
except Exception as e:
  print("Root password failed:", e)
