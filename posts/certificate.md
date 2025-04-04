---
head:
  - - meta
    - name: description
      content: "Generate SSL certificates, CAs, keys, and CSRs using OpenSSL with practical examples and configurations for server and client authentication"
  - - meta
    - name: keywords
      content: SSL certificate CA key CSR OpenSSL server client authentication
---

# Certificate

Generate certifiacte for servers and clients.

## OpenSSL

### Generate CA

```sh
openssl genrsa -aes128 -out custom-ca.key 2048
openssl req -new -key custom-ca.key -subj "/CN=finops" > custom-ca.csr
openssl x509 -req -in custom-ca.csr -signkey custom-ca.key -days 3650 -out custom-ca.crt
```

> We need to give custom-ca.crt to clients and servers in `/etc/ssl/certs/` directory.

When you sign a csr record:

```sh
openssl x509 -sha256 -req -days 1200 -in app.csr -CA custom-ca.crt -CAkey custom-ca.key -CAcreateserial -out app.crt -extfile app.ext
```

Ext file is optional, it is used to add SAN (Subject Alternative Name) to the certificate but SAN can be added to the csr as well.

```sh
cat << EOF > app.ext
subjectAltName = @alt_names
[alt_names]
DNS.1 = app10.finops.devusage.com
DNS.2 = app20.finops.devusage.com
IP.1 = 10.1.1.2
EOF
```

If you use ext than it will be override csr SAN.

Check certificate:

```sh
openssl x509 -in app.crt -text -noout
```

### CSR

If we need to sign a certificate with a CA, we need to generate a CSR (Certificate Signing Request).
And give csr to someone who has a CA or a tool to sign it.

An exmaple config to use to generate csr:

```sh
cat << EOF > app.cnf
[req]
distinguished_name = req_distinguished_name
prompt = no
[req_distinguished_name]
C = NL
ST = Amsterdam
L = Worldline
OU = finops
CN = finops-services@devusage.com
EOF
```

If we need to generate a CSR with SAN (Subject Alternative Name), we need to add `subjectAltName` to the config:

```sh
cat << EOF > app.cnf
[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no
[req_distinguished_name]
C = NL
ST = Amsterdam
L = Worldline
OU = finops
CN = finops-services@devusage.com
[v3_req]
subjectAltName = @alt_names
[alt_names]
DNS.1 = app1.finops.devusage.com
DNS.2 = app2.finops.devusage.com
IP.1 = 10.1.1.1
EOF
```

First generate key and use that key and config to generate csr:

```sh
openssl genrsa -out app.key 2048
openssl req -new -key app.key -out app.csr -config app.cnf
```

To check the csr:

```sh
openssl req -in app.csr -noout -text
```
