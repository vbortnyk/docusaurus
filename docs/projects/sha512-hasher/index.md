---
id: index
title: Technical Writeups
sidebar_position: 1
---

# SHA-512 Hasher

A Python command-line tool for generating SHA-512 hashes from password wordlists.

## Overview

The tool processes wordlists line by line and generates **Hashcat-compatible potfiles** containing `hash:password` entries.

## Technologies

- Python
- SHA-512
- Hashcat

## Key Areas

- Password hashing
- Wordlist processing
- Hashcat integration
- Character encoding
- Memory-efficient file processing

## Goal

Provide a lightweight tool for preparing wordlists and SHA-512 hashes for authorized security testing.