JMeter Load Test: Name Form

What it does
- Posts first and last names to a configurable endpoint using CSV-driven data.

Files
- name-form.jmx: the test plan
- data.csv: sample names (headers: first_name,last_name)

Parameters (with defaults)
- PROTOCOL: http
- HOST: localhost
- PORT: 8080
- PATH: /submit
- THREADS: 10
- RAMP: 10
- LOOPS: 1
- CSV_FILE: load/data.csv

Run (non-GUI)
```bash
jmeter -n -t load/name-form.jmx -l results.jtl \
  -JHOST=example.com -JPROTOCOL=https -JPORT=443 -JPATH=/api/submit \
  -JTHREADS=50 -JRAMP=30 -JLOOPS=2 -JCSV_FILE=load/data.csv
```

Notes
- The request is POST with Content-Type: application/x-www-form-urlencoded and fields `firstName` and `lastName`.
- Adjust PATH and parameters to match your API.

