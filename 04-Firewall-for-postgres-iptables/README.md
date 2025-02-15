#  04 Firewall for postgres (iptables)  
### Real Devops with Dave


Video:
https://youtu.be/6zsNAJpEf30


FIREWALL UBUNTU 
 
Custom Chain is a user-defined chain that allows you to organize and manage firewall rules more efficiently. Custom chains are created to group related rules together. This makes it easier to manage complex firewall configurations and improves readability.

### Prepare..

* change to root
  - sudo su

* Install package

  - apt-get install netfilter-persistent

* list all rules for INPUT chain
  - iptables -L INPUT -v -n --line-numbers

### Create a custom chain

* create a Custom Chain for postgres
  - iptables -N postgres_input

* add a rule to rejet connections
  - iptables -A postgres_input -p tcp --dport 5432 -j DROP

* Link the Custom Chain to the INPUT Chain
  - iptables -A INPUT -j postgres_input

* Test connection:

  - check network traffic:  
    - tcpdump -i any port 5432	

  - check postgres connection
    - psql -h 192.168.1.21 -U postgres -p 5432


* Insert a rule at the top to allow connection for a IP

  - for one private private network
    - iptables -I postgres_input 1 -p tcp --dport 5432 -s 192.168.1.196 -j ACCEPT

  - for all the private network
    - iptables -I postgres_input 1 -p tcp --dport 5432 -s 192.168.1.0/24 -j ACCEPT

  -  for a public ip
    - iptables -I postgres_input 1 -p tcp --dport 5432 -s 188.x.x.x -j ACCEPT

* Test again postgres connection:
    - psql -h 192.168.1.21 -U postgres -p 5432

* Save rules (persistent after reboot)

  - netfilter-persistent save


### Remove custom chain

  1.Remove from INPUT:
    iptables -D INPUT -j postgres_input
  
  2.Remove all rules from chain
    iptables -F postgres_input
  
  3. Delete chain:
     iptables -X postgres_input

### Other iptables commmands:

* Remove a line inside a chain:

  - List rules
    - iptables -L postgres_input --line-numbers -v -n 

  - delete line:
    - iptables -D postgres_input <line-number>
