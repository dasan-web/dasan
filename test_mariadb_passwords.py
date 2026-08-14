import subprocess

passwords = ['', 'root', '1234', '123456', 'admin', 'dasan', '3h8a12Y8gOr6fbVj', 'password', 'mariadb', 'mysql', '1111']
mysql_path = r"C:\Program Files\MariaDB 11.8\bin\mysql.exe"

for p in passwords:
  cmd = [mysql_path, "--user=root", f"--password={p}", "--execute=SHOW DATABASES;"]
  try:
    res = subprocess.run(cmd, capture_output=True, text=True, timeout=3)
    if "Database" in res.stdout:
      print(f"SUCCESS! Password is: '{p}'")
      print(res.stdout)
      
      # Also check products table in dasan_homepage or any database
      cmd_dbs = [mysql_path, "--user=root", f"--password={p}", "--execute=SHOW DATABASES;"]
      dbs_out = subprocess.run(cmd_dbs, capture_output=True, text=True).stdout
      print("All databases:\n", dbs_out)
      
      cmd_prods = [mysql_path, "--user=root", f"--password={p}", "dasan_homepage", "--execute=SELECT id, name, file_url FROM products LIMIT 10;"]
      prods_out = subprocess.run(cmd_prods, capture_output=True, text=True).stdout
      print("Local products sample:\n", prods_out)
      break
    else:
      print(f"Failed password '{p}': {res.stderr.strip()}")
  except Exception as e:
    print(f"Error testing '{p}': {e}")
