# SHA512 Hasher

A simple Python command-line tool that reads a wordlist, calculates the SHA-512 hash for each password, and writes the results in Hashcat potfile format.

## Features

* Reads passwords from a `.txt` wordlist.
* Calculates a SHA-512 hash for each password.
* Outputs results in `hash:password` format.
* Processes the wordlist line by line, so the entire wordlist does not need to be loaded into memory.
* Supports wordlists containing non-UTF-8 characters.

## Requirements

* Python 3.8 or newer
* No external Python packages are required.

## Usage

```bash
python3 pass_hasher.py <input_wordlist> <output_potfile>
```

Example:

```bash
python3 pass_hasher.py rockyou.txt hashes.potfile
```

The generated file will contain entries such as:

```text
<sha512_hash>:password
<sha512_hash>:hello
<sha512_hash>:admin123
```

## Input

The input file must contain one password per line.

Example:

```text
password
hello
admin123
```

## Output

The output uses the following format:

```text
hash:password
```

This format can be used as a Hashcat potfile for SHA-512 hashes.

For SHA-512, Hashcat uses hash mode:

```text
1700
```

For example:

```bash
hashcat -m 1700 --potfile-path hashes.potfile --show hashes.txt
```

## Character Encoding

The program reads the input wordlist using `latin-1` encoding. This is useful for wordlists such as `rockyou.txt`, which may contain bytes that are not valid UTF-8.

The password is then encoded as UTF-8 before calculating the SHA-512 hash.

## Example

Given `words.txt`:

```text
password
hello
admin123
```

run:

```bash
python3 pass_hasher.py words.txt hashes.potfile
```

The resulting `hashes.potfile` contains:

```text
<hash-of-password>:password
<hash-of-hello>:hello
<hash-of-admin123>:admin123
```

## Project Structure

```text
sha512-hasher/
├── pass_hasher.py
├── README.md
└── .gitignore
```