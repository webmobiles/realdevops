#  03. Certificates with acme.&#8203;sh and Cloudflare 
### Real Devops with Dave


Video:
https://youtu.be/PLN3qC8p53A

## Acme Protocol

It's a protocol for automating certificate lifecycle management communications between Certificate Authorities  (Let's Encrypt, Zerossl) and a company's web servers (Cloudflare, AWS Router 53, Azure Dns, etc)

acme&#8203;.sh  is an ACME client written purely in shell script. It implements the full ACME protocol.

Cert-manager in Kubernetes, implements the ACME client protocol too.


## Configure CloudFlare

CloudFlare provides network and security products. We're going to use his free dns service to manage domains and subdomains.

1. Create a wildcard dns record for a subdomain inside your domain

2. Create a token in cloudflare

## Install

 
1. Configure tokens for cloudflare on file env-zero

2. Install zero&#8203;.sh


    - ./initfolders.sh

    - docker compose up -d

    Enter to the shell in container   (docker desktop or with docker exec)

    - cd /opt/acme-installer

        ```
        ./acme.sh --install  \
        --home /opt/acme/acme-bin \
        --config-home /opt/acme/acme-data \
        --cert-home  /etc/mycertificates \
        --accountemail  "myaccount@gmail.com"
         ```

#### Get certificates 


1. cd /opt/acme/acme-bin


2. create certificate

    ```
     ./acme.sh  --config-home /opt/acme/acme-data \
      --issue --dns dns_cf -d mylab.mydomain.com -d *.mylab.mydomain.com 
    ```


3. Verify certificates names on host:
  - cd certificates/mydomain.com
  - openssl x509 -noout -ext subjectAltName -in fullchain.cer



#### debug certification process

./acme.sh --debug --issue ...


#### Links

- acme.sh site: 
  https://github.com/acmesh-official/acme.sh
