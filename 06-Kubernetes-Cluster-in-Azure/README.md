#  06 Installing Kubernetes Cluster (EKS) in Azure 
### Real Devops with Dave


Video:
https://www.youtube.com/watch?v=_-YIyNB0cjI&t=445s


### Prepare..

* install azure client : az

  - For windows:
    - https://learn.microsoft.com/en-us/cli/azure/install-azure-cli

  - For mac
    - brew update && brew install azure-cli

    - az login	



- install kubernetes client and utils:
   - brew install kubectl kubectx kubens

- install K9s is a terminal UI to manage clusters:
   - brew install k9s 

- install on your bash profile shell some shortcuts commands:
    nano $HOME/.zshrc  (for mac only)

    add this:
    ```
      alias k='kubectl'
      alias kc='k config view --minify | grep name'
      alias kp='kubectl get pods'
      alias kpp='kubectl get pods --show-labels -o wide'
      alias ks='kubectl get services'
      alias kss='kubectl get services --show-labels -o wide'
      alias kd='kubectl get deployments'
    ````


	
### Create the azure kubernetes demo deployment

https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-portal?tabs=azure-cli

## Azure virtual machines


Azure virtual machines (VMs) are categorized into specific families based on their intended workload. Each family is optimized for different use cases, such as general-purpose computing, memory-intensive applications, storage optimization, or GPU workloads.


D-series
Dv4/Dsv4 (Intel Cascade Lake)
Dv5/Dsv5 (Intel Ice Lake)
Dasv5 (AMD EPYC)
B-series (Burstable) – Good for low-traffic, non-critical applications.

D4ds_v4 belongs to  Dv4-series family  

Best for general containerized applications, web services, and moderate workloads.



### Get the public ip for your cluster:

When you create an Azure Kubernetes Service (AKS) cluster, the system generates two resource groups:

Primary Resource Group: This is the resource group you specify during the creation of the AKS cluster. It contains the control plane for managing your Kubernetes cluster.

Node Resource Group: Automatically created by the AKS service, this resource group houses all the infrastructure like virtual machines (VMs). By default, its name follows the pattern MC_<resource-group-name>_<cluster-name>_<region>.
MC_, which stands for Managed Cluster

