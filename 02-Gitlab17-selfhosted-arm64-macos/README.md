# 02 Gitlab17 selfhosted for arm64 macos

Install Gitlab with a runner on a Mac OS ARM 64 with your own domain.

## REQUIREMENTS 

- MAC with Apple silicon (Arm64)
- Docker Desktop or Docker Compose with 4 GBytes Free RAM
    - Docker Desktop Settings -> General
        - [x] Use containerd for pulling and storing images
        - Virtual Machine Options
            - Choose: Virtual Machine Manager (VMM): Docker VMM
- Have a subdomain and certificates for the subdomain
    - If you need a tutorial to create certificates with acme, zerossl and cloudflare
        - https://www.youtube.com/watch?v=PLN3qC8p53A
- Forward 443, 22, 8150 ports from your modem/router/box to your computer ip



## INSTALL


### Configure certificates:

1. Copy your certificates to ./ssl
2. Configure .env-template file  
    - Subdomains:
        - git: for the code repositry (web repositories)
        - rg: for the container registry (docker images)
    - Your main subdomain:
        - $MY_MAIN_DOMAIN=homelab.mydomain.com
    - With your certificates files. Example:
        - MY_CERTIFICATE_CER=PathFile.cer
        - MY_CERTIFICATE_KEY=PathFile.key

### Prepare folders:       
1. Run script to create folders and convert .env-template to .env:
   - ./initfolders.sh

### Start gitlab:    
1. Run containers:
   - docker compose up -d   

2.  Check the git container :

         gitlab-ctl status

3.  Get the root password from the shell in the container 'git'
     cat /etc/gitlab/initial_root_password

3.  Visite the website
    https://git.homelab.mydomain.com

### Create a Runner for gitlab:  

1.  Create a runner from the new gitlab site

    - Bottom 'Admin' -> CI/CD -> Runners -> New Instance Runner

        - Linux Option	
        - [ ] Run untagged jobs
	    - Maximum job timeout -> 6000
    
    - Copy the command to register the runner

        gitlab-runner register  --url https://git.homelab.peruprop.com  --token glrt-t2_GpUW9pKrRgksSeyx1Rdr
        Choose an executor when prompted by the command line.
        gitlab-runner run

2. Register the runner


    - Enter to the shell in runner container:

    - Paste register command:
        Example:
            gitlab-runner register  --url https://git...

    - Enter the GitLab instance URL <-- "Enter" to keep the same domain


    - Enter a name for the runner <-- Just type "myrunner1"

    - Enter an executor <-- type 'docker

    - Enther the image <- type 'ubuntu:22.04'

    - Finally you get

    "Configuration (with the authentication token) was saved in "/etc/gitlab-runner/config.toml"

3. Add certificates to the runner

    - add the content  from the file ./to-add-runner-cfg.toml to ./target-container/runner-config/config.toml (change accord your certificates files)
    
    - Restart the runner container


### Reset everything:  

Warning; this delete all your gitlab local repositories and installed files <br/>

- docker compose down
- ./reset.sh

## Some useful commands:

gitlab-ctl status
gitlab-ctl show-config









