import subprocess
import time

mysqld_path = r"C:\Program Files\MariaDB 11.8\bin\mysqld.exe"
mysql_path = r"C:\Program Files\MariaDB 11.8\bin\mysql.exe"

print("Starting temporary mysqld on port 3307...")
proc = subprocess.Popen([
    mysqld_path,
    "--console",
    "--standalone",
    "--port=3307",
    "--skip-grant-tables",
    r"--datadir=C:\Program Files\MariaDB 11.8\data"
])

time.sleep(5)

try:
  print("Connecting to local MariaDB 3307...")
  cmd = [mysql_path, "--host=127.0.0.1", "--port=3307", "--user=root", "dasan_homepage", "-e", "SELECT id, name, file_url FROM products;"]
  res = subprocess.run(cmd, capture_output=True, text=True)
  print("=== PRODUCTS TABLE Output ===")
  print(res.stdout)
  if res.stderr:
    print("STDERR:\n", res.stderr)
finally:
  proc.terminate()
