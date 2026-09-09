# V-server setup

This guide explains how to securely configure SSH access to a virtual server. It covers generating SSH keys, connecting to the server, enabling key-based authentication, and disabling password login to improve server security. After completing these steps, you will be able to log in to your server using SSH keys, manage the server remotely, and ensure that password-based access is disabled for better protection.

## Table of Contents

- [V-server setup](#v-server-setup)
  - [Create SSH key](#create-ssh-key)
  - [Login using your login credentials](#2-login-using-your-login-credentials)
  - [Establish ssh Connection](#3-establish-ssh-connection)
  - [Login using the ssh-tunnel](#4-login-using-the-ssh-tunnel)
  - [Remove Password authentication from the Server](#5-remove-password-authentication-from-the-server)
  - [Restart ssh service](#5-remove-password-authentication-from-the-server)
  - [Restart ssh service](#6-restart-ssh-service)
  - [Check the behavior](#7-check-if-password-authentication-is-disabled)


### 1. Create SSH key
```bash
$ ssh-keygen -t ed25519
```

### 2. Login using your login credentials:
```bash
$ sssh <user>@<your_ip>
```
    
### 3. Establish ssh Connection:
```bash
$ ssh-copy-id -i ~/.ssh/your-key <user>@<your-ip>
``` 
- enter the password to V-Server
- press enter button

### 4. Login using the ssh-tunnel:
```bash
$ ssh -i ~/.ssh/your-key <user>@<your-ip>
```
### 5. Remove Password authentication from the Server
- ⚠️ Doublecheck if ssh Login works properly before the Password authentication is disabled!
Than run the command to open the configuration file:
```bash
   $ sudo nano etc/ssh/sshd_config
```
  - find the commented line: #PasswordAuthentication no
  - uncomment this line und replace 'yes' with 'no'
  - save and Exit
### 6. Restart ssh service: 
```
$ sudo systemctl restart ssh.service
```
## 7. Check if password authentication is disabled:
```bash
$ logout
$ ssh -o PubkeyAuthentication=no <user>@<your-ip>
```
- expectet result: