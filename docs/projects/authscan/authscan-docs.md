# Authscan

This tool is a command-line utility for testing SSH connectivity and validating authentication credentials against remote servers in authorized environments only.

It is designed for the following scenarios:

  - Verifying SSH access configuration
  - Testing user authentication in controlled environments
  - Automating connectivity checks for infrastructure
  - Validating credential correctness during setup

:::warning 
This tool must only be used on systems you own or are explicitly authorized to test.
:::

## Table of Contents
  -  [Prerequisites](#prerequisites)
  -  [Quick Start](#quick-start)
  -  [Usage](#usage)
  -  [Security Notes](#security-notes)

## Prerequisites

 - Python 3.8+
 - Access to an SSH server (test lab or authorized environment)

 ## Quick Start
 Clone the repository and install dependencies:
 ```bash
 $ git clone https://github.com/vbortnyk/authscan.git
 $ cd authscan
 $ pip install -r requirements.txt
 ```

Check server availability:
```bash
$ ping <server-ip-or-hostname>
```

## Usage
Required arguments
  - `-u` -> SSH username (mandatory)
  - `-w` -> a password or a path to a `.txt` file containing possible passwords. Each entry in the document must be on a new line
  - `-s` -> SSH server (IP or hostname)
  - `--min` -> minimum password length
  - `--max` -> maximum password length
  - `-c` -> charset to be used in the password


> [!IMPORTANT]
>- The `-u` flag specifies a username. This flag is mandatory
>- The `-w` flag enables the dictionary-based approach
> - The `--min` and `--max` flags use the brute-force approach
>- The `-w` option and the `--min` `--max` options are mutually exclusive
> - The `-c` flag can only be used together with `--min` and `--max` to restrict password generation to a specific set of characters
> - Either `-w` or the combination of `--min` and `--max` is required

### Example 1:
```bash
$ python authscan.py -u <username> -w <path/to/file> -s <server-ip>
 ```
 Explanation: Log in to the server at `<server-ip>` with username `<username>`. Attempt authentication with each password listed in the file at `<path/to/file>` 

 ### Example 2:
 ```bash
$ python authscan.py -u <username> --min <min-pass-length> --max <max-pass-length> -c <charset> -s <server-ip>
 ```
 Explanation: Log in to the server at `<server-ip>` using a password that contains only characters from `<charset>`. The password length must be at least `<min-pass-length>` characters and at most `<max-pass-length>` characters.

## Security Notes

- Use only on systems you own or are authorized to test.
- Prefer SSH key authentication over passwords.
- Do not use this tool against production systems without approval.