---
title: LUKS encryption
tags:
    - luks
    - encryption
---

# {{ page.title }}

## Create encrypted file
```bash
dd if=/dev/zero of=EncryptedFile.img bs=1M count=1024.
```
Create device:
```bash
cryptsetup luksFormat /dev/sda2
```
Opening device:
```bash
cryptsetup luksOpen /dev/sda2 path # After this will be created /dev/mapper/path, which we can mount anywhere, after creating new filesystem.
```
That's it.

## Mount encrypted file
```bash
cryptsetup luksOpen EncryptedFile.img secrets
mount /dev/mapper/secrets /mnt
# ...
umount /mnt
cryptsetup luksClose secrets
```
